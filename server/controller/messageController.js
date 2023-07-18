const conversationModel = require("../model/conversationModel")
const messageModel = require("../model/messageModel")



const newMessage = async(req,res)=>{
    try{
        const newMessage = new messageModel(req.body)
        await newMessage.save()
        await conversationModel.findByIdAndUpdate(req.body.conversationId,{message: req.body.text})
        return res.status(200).send({message: "Message has been sent succesfully"})
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getMessages = async(req,res)=>{
    try{
        const messages = await messageModel.find({conversationId: req.params.id})
        return res.status(200).send(messages)
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {newMessage, getMessages}

