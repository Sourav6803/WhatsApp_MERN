import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { AccountContext } from '../../../context/AccountProvider'
import { getConversation } from '../../../service/api'


const ChatBox = () => {

    const {person, account } = useContext(AccountContext)
    const [conversation, setConversation] = useState({})

    useEffect(()=>{
      const getConversationDetail = async()=>{
        let data = await getConversation({senderId: account.sub , reciverId: person.sub })
        setConversation(data)
      }
      getConversationDetail()
    },[person.sub])

  return (
    <Box style={{height: '75%'}}>
        <ChatHeader person={person} />
        <Messages person={person} conversation={conversation}/>
        
    </Box>
  )
}

export default ChatBox