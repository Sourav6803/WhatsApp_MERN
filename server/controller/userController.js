const userModel = require("../model/userModel")

const addUser = async(req,res)=>{
    try{
        let exist = await userModel.findOne({sub: req.body.sub})
        if(exist){
            res.status(200).send({message: "User already exist"})
            return;
        }

        const newUser = new userModel(req.body)
        await newUser.save()
        return res.status(200).send(newUser)
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getUser = async(req,res)=>{
    try{
        let allUser = await userModel.find({})
        res.status(200).json(allUser)
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = {addUser, getUser}
