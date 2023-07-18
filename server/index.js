const express = require('express')
const app = express()
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routes/route')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
var cors = require('cors');
app.use(cors())
const multer= require("multer");
app.use( multer().any())

const { Server } = require("socket.io")

const io = new Server(9000,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let users = []

const addUser = (userData, socketId)=>{
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId})
}

const getUser = (userId)=>{
    return users.find(user=>user.sub === userId)
}


io.on('connection', (socket)=>{
    console.log("connected")
    socket.on("addUsers", userData=>{
        addUser(userData , socket.id)
        io.emit("getUsers", users)
    })

    socket.on('sendMessage', data=>{
        const user = getUser(data.reciverId)
        io.to(user.socketId).emit('getMessage', data)
    })

})

app.use('/', route)
mongoose.connect("mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/whatsApp?retryWrites=true&w=majority", {
    useNewUrlParser: true
}) 
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )





const PORT = 8000;
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))
// io.listen(9000)