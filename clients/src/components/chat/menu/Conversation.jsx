

import { Box, Typography, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import { useContext , useEffect, useState} from 'react';
import { setConversation , getConversation} from '../../../service/api';
import { formatDate } from '../../utils/common-utils';


const Component = styled(Box)`
    display: flex;
    height: 45px;
    padding: 13px 0;
    cursor: pointer
`

const Image = styled('img')({

    width: 50,
    height: 50,
    borderRadius: '50%',
    padding: '0 14px',
    objectFit: 'cover'
})

const Container = styled(Box)`
    display: flex;
`

const Timestamps = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`

const Text = styled(Typography)`
    font-size: 14px;
    color: #00000099;
    
`


export const Conversation = ({user})=>{
    const [message , setMessage] = useState({})
    const {setPerson , account , newMessageFlag} = useContext(AccountContext)

    const getUser = async()=>{
        setPerson(user);
        await setConversation({senderId: account.sub, reciverId: user.sub})
    }

    useEffect(()=>{
        const getConversationdetails = async()=>{
            const data = await getConversation({senderId:account.sub, reciverId:user.sub})
            setMessage({text: data?.message , timestamps: data?.updatedAt})
        }
        getConversationdetails()
    },[newMessageFlag])
    
    return(
        <>
            <Component onClick={()=>getUser()}>
                <Box> 
                    <Image src={user.picture}/>
                </Box>
                <Box style= {{ width : '100%'}} >
                    <Container>
                        <Typography>{user.name}</Typography>
                        {
                            message?.text && 
                            <Timestamps>{formatDate(message?.timestamps)}</Timestamps>
                        }
                    </Container>
                    <Box>
                        <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                    </Box>
                </Box>
            </Component>
        </>
    )
}

