import styled from 'styled-components'

export const Page = styled.div`
    display: flex;
    flex-direction: row;
`

export const SideImage = styled.div`
    height: 100%;
    width: 60%;
    margin-right: 5rem;
    text-align: center;
`

export const Image = styled.img`
    height: 790px;
`

export const SideContent = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
`

export const ConfirmEmail = styled.button`
    position: relative;
    margin: 15px;
    background-color: #7B69B7;
    color: white;
    border: none;
    padding : 10px 15px;
    border-radius: 5px;
    cursor : pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #5D4A91;
    }
`
export const DisableButton = styled.button`
    position: relative;
    margin: 15px;
    background-color: gray;
    color: white;
    border: none;
    padding : 10px 15px;
    border-radius: 5px;
`

export const DivContainer = styled.div`
    display: flex;
    flex-direction : row;
    width: 500px;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`