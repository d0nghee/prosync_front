import styled, { keyframes } from 'styled-components'
import Button from '../components/button/Button'

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
    height: 40%;
    width: 67%;
    object-fit: cover;
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
    border-radius: 3px;
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
    border-radius: 3px;
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

export const VerifyCodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

export const VerifyCodeButton = styled(Button)`
    margin-left: 1rem;
    animation : ${fadeIn} 0.3s ease-in-out;
`