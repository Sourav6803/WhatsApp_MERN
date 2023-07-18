import { Box, InputBase, styled } from '@mui/material'
import { AiOutlineSearch } from 'react-icons/ai'

const Component = styled(Box)`
    background: #fff;
    height: 45px;
    border-bottom: 3px solid #F2F2F2;
    display: flex;
    align-items: center;
`
const Wrapper = styled(Box)`
    background-color: #f0f2f6;
    position: relative;
    margin: 0 13px;
    width: 100%;
    border-radius: 10px;
`
const Icon = styled(Box)`
    position: absolute;
    height: 100%;
    padding: 6px 10px;
    color: #919191;
`

const InputFields = styled(InputBase)`
    width: 100%;
    padding: 16px;
    padding-left: 65px;
    height: 15px;
    font-size: 14px;
`

const Search = ({setText}) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <AiOutlineSearch />
                </Icon>
                <InputFields
                    placeholder='Search or start new chat'
                    onChange={(e)=>setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    )
}

export default Search