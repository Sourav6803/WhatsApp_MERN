

const uploadFiles = async(req,res)=>{
    try{
        const url = "http://localhost:8000"
        if(!req.file){
            return res.status(400).send({message: "File not found"})
        }
        const imgUrl = `${url}/file/${req.file.filename}`

        return res.status(201).send(imgUrl)
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

// module.exports = uploadFile