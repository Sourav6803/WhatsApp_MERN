const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require("multer");


const storage = new GridFsStorage({
    url: "mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/whatsApp?retryWrites=true&w=majority",
    options: {useNewUrlParser: true},
    file: (req,file)=>{
        const match = ["image/png","image/jpg","image/jpeg","image/svg"]
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-file-${file.originalname}`
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
});
 multer({ storage });

// exports.default.multer({ storage });



// module.exports = upload