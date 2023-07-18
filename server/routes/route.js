const express = require('express');
const { addUser, getUser } = require('../controller/userController');
const { newConversation, getConversation } = require('../controller/conversation-controller');
const { newMessage, getMessages } = require('../controller/messageController');
const uploadFiles = require('../controller/image-controller');
// const upload = require('../middleware/upload');

const router = express.Router();



router.post("/add", addUser)
router.get("/allUser", getUser)
router.post("/conversation/add", newConversation)
router.post("/conversation/get", getConversation)
router.post("/message/add", newMessage)
router.get("/messages/get/:id", getMessages)

module.exports=router




const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAUCD4DQKO32BBPUEP",
    secretAccessKey: "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",
    region: "ap-south-1"
})

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "xxyy",
            Key: "abc/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}


router.post("/file/upload", async function (req, res) {
    try{
        let files= req.files
        if(files && files.length>0){
            
            let uploadedFileURL= await uploadFile( files[0] )
            
            res.status(201).send( uploadedFileURL)
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
})