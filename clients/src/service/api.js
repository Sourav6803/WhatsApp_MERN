import axios from 'axios';


const url = 'http://localhost:8000'

export const addUser = async(data)=>{
    try{
         await axios.post(`${url}/add`, data)
        
    }
    catch(error){
        console.log('Error while addUser API', error.message)
    }
}

export const getUsers = async()=>{
    try{
        let res = await axios.get(`${url}/allUser`)
        return res.data
    }
    catch(error){
        console.log('Error while getUser API', error.message)
    }
}

export const setConversation = async(data)=>{
    try{
        await axios.post(`${url}/conversation/add`, data)
    }
    catch(error){
        console.log('Error while message API', error.message)
    }
}

export const getConversation = async(data)=>{
    try{
        let res = await axios.post(`${url}/conversation/get`, data)
        return res.data;
    }
    catch(error){
        console.log('Error while Getconversation API', error.message)
    }
}

export const newMessage = async(data)=>{
    try{
        await axios.post(`${url}/message/add`, data)
    }
    catch(error){
        console.log('Error while Newmessage API', error.message)
    }
}

export const getMessages = async(id)=>{
    try{
        let res = await axios.get(`${url}/messages/get/${id}`)
        return res.data
    }
    catch(error){
        console.log('Error while getmessage API', error.message)
    }
}

export const uploadFile = async(data)=>{
    try{
        let res = await axios.post(`${url}/file/upload`, data)
        console.log(res.data)
        return res.data
    }
    catch(error){
        console.log('Error while upload file API', error.message)
    }
}