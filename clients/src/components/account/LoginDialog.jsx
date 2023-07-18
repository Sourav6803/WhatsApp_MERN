import { Dialog, Box, Typography, ListItem, styled, List } from "@mui/material"
import { qrCodeImage } from "../../constarants/data";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";



const dialogStyle = {
    height: "96%",
    marginTop: "12%",
    width: "60%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: 'none',
    overflow: 'hidden',
}

const Component = styled(Box)`
    display: flex;
`

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`
const Qrcode = styled('img')({
    height: 264,
    width: 264,
    margin: '50px 0 0 50px'
})

const Title = styled(Typography)`
    font-size: 26px;
    font-weight: 300;
    color: #525252;
    font-family: inherit;
    margin-bottom: 25
`

const Styledlist = styled(List)`
    & > li {
        padding:0;
        margin-top: 15px;
        font-size: 16px;
        line-height: 28px;
        color: #4a4a4a
    }
`



function LoginDialog() {
    const { setAccount } = useContext(AccountContext)

    const onLoginSuccess = async(res) => {
        const decode = jwt_decode(res.credential)
        setAccount(decode)
        await addUser(decode)
    }

    const onLoginError = (res) => {
        console.log(res);
    }
    return (
        <>
            <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
                <Component >
                    <Container>
                        <Styledlist>
                            <Title>To use WhatsApp on your Computer:</Title>
                            <ListItem>1.Open WhatssApp on your Phone</ListItem>
                            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                            <ListItem>3. Point your phone to this screen to captuare the code</ListItem>
                        </Styledlist>
                    </Container>
                    <Box style={{ position: 'relative' }}>
                        <Qrcode src={qrCodeImage} alt="Qrcode"></Qrcode>
                        <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(25%)' }}>
                            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
                        </Box>
                    </Box>
                </Component>
            </Dialog>
        </>
    )
}

export default LoginDialog