import styled, { keyframes } from "styled-components";
import Button from "../components/button/Button";

export const Page = styled.div`
  display: flex;
  flex-direction: row;
  height: 800px;
`;

export const SideImage = styled.div`
  height: 100%;
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const SideTotal = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: center;
`;

export const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 80%;
  width: 40%;
  justify-content: center;
  gap: 2rem;
`;

export const ConfirmEmail = styled.button`
  width: 80px;
  height: 2.2rem;
  background-color: #7b69b7;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #5d4a91;
  }
`;
export const DisableButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
`;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const VerifyCodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
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
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const One = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CheckButton = styled.button`
  width: 100px;
  height: 2.2rem;
  background-color: ${({ valid }) => (!valid ? "rgb(123, 105, 183)" : "green")};
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease 0s;
  border-radius: 3px;
  font-size: 15px;
  margin-top: 0px;
`;
