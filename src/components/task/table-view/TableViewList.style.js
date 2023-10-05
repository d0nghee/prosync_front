import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  width: 100%;
  height: 5rem;
  margin: 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  font-weight: bold;

  input {
    width: 20px;
  }

  input[type="checkbox"]:checked {
    background-color: #48cae4;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 2.5rem 0 1rem;
  align-items: center;

  & > div {
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
    text-align: center;
  }

  & > div:nth-child(1) {
    flex: 1.5;
    padding: 0;
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }

  // 체크박스
  & > div:first-child {
    display: flex;
    align-items: center;
  }

  & > form {
    width: 100%;
  }
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

export const Contents = styled.div`
  display: flex;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  & > div,
  & > input,
  & > div > input {
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
    text-align: center;
    font-size: 1rem;
  }

  input {
    background-color: white;
  }

  div:nth-child(1),
  input:nth-child(1) {
    flex: 1.5;
  }
`;

export const LinkContents = styled(Link)`
  display: flex;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  font-size: 1rem;

  & > div,
  & > input,
  & > div > input {
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
    border: none;
    text-align: center;
  }

  input {
    background-color: white;
  }

  div:nth-child(1),
  input:nth-child(1) {
    flex: 1.5;
  }
`;

export const Assignee = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    width: 80%;
    padding-bottom: 10px;
    border-bottom: 1px solid #d6ccc2;
  }
`;

export const Box = styled.ul`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const PageButton = styled.button`
  width: 80px;
  padding: 10px 10px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 1rem;
  cursor: pointer;
  border: ${(props) => (props.active ? "3px solid #be95c4" : "#333")};
  color: #be95c4;
  background-color: white;

  &:hover {
    opacity: 0.7;
    background-color: #be95c4;
    color: white;
  }
`;

export const EditButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const Date = styled.div`
  display: flex;
`;

export const StatusBox = styled.div`
  width: 100%;

  &:hover {
    opacity: ${(props) => (props.edit ? 0.7 : 1)};
  }
`;

export const TaskInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  border: none;
  border: 1px solid #c0c0c0;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 30px;
    height: 50%;
    border: none;
    font-weight: bold;
    background-color: transparent;
    font-size: 1rem;
  }

  button:first-child {
    color: #bc4749;
  }

  button:last-child {
    color: #4361ee;
  }
`;

export const EditArea = styled.div`
  display: flex;
`;

export const ErrorMessage = styled.div`
  background-color: #ff8fab;
  padding: 5px;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  animation: fadeInDown 1s;

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

export const ModalSection = styled.div``;

export const DateInput = styled.div`
  display: flex;
  flex-direction: column;

  & > div > span {
    margin-right: 10px;
    color: #0077b6;
  }

  & > div > input {
    text-align: center;
  }
`;