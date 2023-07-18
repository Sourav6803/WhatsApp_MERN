const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        iss: {
            type: String,
            //required: "Title is Required",  
        },
        nbf: {
            type: String,
            //required: "Name is Required",  
        },

        aud: {
            type: String,
            //required: "Phone number is Required",
        },
        sub: {
            type: String,
            required: true,
        },
        email: {
            type: String,  
        },
        email_verified: {
            type: Boolean,  
        },
        azp: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            // required: true,
        },
        given_name: {
            type: String,
        },
        family_name: {
            type: String,
        },
        iat: {
            type: Number
        },
        exp: {
            type: Number,
        },
        jti: {
            type: String,
        },
        
        
    }, { timestamps: true });

/************************************CONNECTION CREATED***************************************/
module.exports = mongoose.model("User", userSchema);

