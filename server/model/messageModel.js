const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: Array, 
        },
        senderId: {
            type: String,  
        }, 
        reciverId:{
            type: String, 
        },
        text:{
            type: String, 
        }, 
        type:{
            type: String, 
        },
    }, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
