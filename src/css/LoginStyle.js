import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const InputContent = styled.input`
  width: ${({ wid }) => wid || "65%"};
  height: 2rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  font-size: large;
  outline: none;
`;

export const LabelContent = styled.label`
  text-align: left;
  width: 40%;
  font-size: larger;
  font-weight: 60;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;
