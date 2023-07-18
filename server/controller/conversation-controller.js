const conversationModel = require("../model/conversationModel");


const newConversation = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;

        const exist = await conversationModel.findOne({ members: { $all: [reciverId, senderId] } })
        if (exist) {
            return res.status(200).send({ message: "Conversation Already exist" })
        }

        const newConversations = new conversationModel({
            members: [senderId, reciverId]
        })
        await newConversations.save()

        return res.status(200).send("conversation saved success")
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getConversation = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const reciverId = req.body.reciverId;
        const conversation = await conversationModel.findOne({ members: { $all: [reciverId, senderId] } })
        
        return res.status(200).json(conversation)
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { newConversation, getConversation }