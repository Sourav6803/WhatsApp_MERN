import { MoreVert } from '@mui/icons-material';
import {Menu ,MenuItem , styled} from '@mui/material';
import { useState } from 'react';

const MenuOption = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`

const HeaderMenu = ({setOpenDrawer}) => {
    const [open , setOpen] = useState(false);
    const handleClose = ()=>{
        setOpen(false)
    }

    const handleClick = (e)=>{
        setOpen(e.currentTarget)
    }
    return (
        <>
            <MoreVert onClick={handleClick}/>
            <Menu
                id="basic-menu"
                anchorEl={open}
                keepMounted
                open={open}
                getcontentAnchorE1={null}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                
            >
                <MenuOption onClick={()=>{handleClose(); setOpenDrawer(true);}}>Profile</MenuOption>
                
            </Menu>
        </>

    )
}

export default HeaderMenu;