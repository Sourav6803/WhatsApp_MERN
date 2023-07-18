import { Box, styled } from "@mui/material";

import Headers from "./Head";
import Search from "./Search";
import Conversation from "./Conversations";
import { useState } from "react";


const Menu = ()=>{
    const [text, setText] = useState('')
    return (
        <Box>
            <Headers/>
            <Search setText= {setText}/>
            <Conversation text={text}/>
        </Box>
    )
}

export default Menu;