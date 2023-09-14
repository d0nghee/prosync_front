import styled from 'styled-components'

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: auto 1fr auto;
    grid-gap: 10px;
    height: 100vh;
`

export const Header = styled.div`
    background-color: gray;
    color: white;
    padding : 10px;
    grid-column: span 2;
`

export const SideBar = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const Content = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const Footer = styled.div`
    background-color: bisque;
    color: white;
    padding : 5px;
    grid-column: span 2;
`

export const SideMenuDetail = styled.button`
    background-color: white;
    color: black;
    padding : 15px;
    margin-left : 5px;
    margin-top: 5px;
    border: none;
    cursor: pointer;
    text-align: left;
    font-size: larger;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.3);
`

export const List = styled.ul`
    list-style: none;
    padding : 0;
`

export const ListItem = styled.li`
    margin-left: 5px;
    margin-top: 5px;
    padding: 8px;
    border-left : 3px solid black;

`
export const ListItemButton = styled.button`
    width: 100%;
    height: 30px;
    border: 0;
    text-align: left;
    background-color: white;
    cursor: pointer;
`

export const InputText = styled.input`
    border: 1px #FFDAB9 solid;
    border-radius: 3px;
`
export const InputTextArea = styled.textarea`
    width: 30%;
    border: #FFDAB9 1px solid;
    resize: none;
    border-radius: 3px;
`

export const CustomDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-right: 20px;
    margin-bottom: 40px;
    padding: 10px;
`

export const Label = styled.label`
    font-size: larger;
    font-weight: 300;
`