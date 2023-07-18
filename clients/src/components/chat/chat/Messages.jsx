import { Box, styled } from '@mui/material';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Footer from './Footer';
import { AccountContext } from '../../../context/AccountProvider';
import { getMessages, newMessage } from '../../../service/api';
import Mesage from './Mesage';



const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})
`

const Component = styled(Box)`
    height: 80vh;
    overFlow-y: scroll;
`

const Container = styled(Box)`
    padding: 1px 80px
`

const Messages = ({ person, conversation }) => {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])
    
    const [file, setFile] = useState()
    const [image, setImage] = useState('')
    const [incomingMessage, setIncommingMessage] = useState(null)

    const { account, socket ,newMessageFlag, setNewMessageFlag } = useContext(AccountContext)

    useEffect(()=>{
        socket.current.on('getMessage',data=>{
            setIncommingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    },[])

    const scrollReff = useRef()

    useEffect(() => {
        const getMessagedetail = async () => {
            let data = await getMessages(conversation._id)
            setMessages(data)
        }
        conversation._id && getMessagedetail()
    }, [person._id, conversation._id, newMessageFlag])

    useEffect(()=>{
        scrollReff.current?.scrollIntoView({transtion:'smooth'})
    },[messages])

    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
        setMessages(prev=>[...prev, incomingMessage])
    },[incomingMessage, conversation])

    const sendText = async (e) => {
        const code = e.keyCode || e.which
        if (code === 13) {
            let message = {}
            if(!file){
                 message = {
                    senderId: account.sub,
                    reciverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
    
                }
            }else{
                 message = {
                    senderId: account.sub,
                    reciverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
    
                }
            }
            
            socket.current.emit("sendMessage", message)
            await newMessage(message)
            setValue('')
            setFile('')
            setImage('')
            setNewMessageFlag(prev => !prev)
        }
    }
    return (
        <>
            <Wrapper>
                <Component>
                    {
                        messages && messages?.map(message => (
                            <Container ref={scrollReff}>
                                <Mesage message={message} />
                            </Container>
                        ))
                    }
                </Component>
                <Footer
                    sendText={sendText}
                    setValue={setValue}
                    value={value}
                    file = {file}
                    setFile={setFile}
                    setImage={setImage}
                />
            </Wrapper>
        </>
    )
}

export default Messages;