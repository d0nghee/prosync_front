import styled, { keyframes } from 'styled-components'
import Button from '../components/button/Button'

export const Page = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    height: 800px;
`

export const SideImage = styled.div`
    height: 100%;
    width: 50%;
    margin-right: 5rem;
    text-align: center;
`

export const Image = styled.img`
    height: 836px;
    width: 100%;
    object-fit: cover;
`

export const SideContent = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    margin-left: 170px;
`

export const ConfirmEmail = styled.button`
    position: relative;
    margin: 23px;
    width: 80px;
    height: 2.2rem;
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
    margin: 23px;
    background-color: gray;
    color: white;
    border: none;
    padding : 10px 15px;
    border-radius: 3px;
`

export const DivContainer = styled.div`
    display: flex;
    flex-direction : row;
    width: 100%;
    margin-bottom: 20px;
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
    margin-left: 1.5rem;
    animation : ${fadeIn} 0.3s ease-in-out;
`