import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Modal from "../../components/task/Modal";
import { postTaskStatus } from "../../util/api";

export default function NewTaskStatus({ onClose }) {
  const params = useParams();

  const submitHandler = (event) => {
    event.preventDefault();
    const color = event.target[1].value;
    const taskStatus = event.target[0].value;
    const seq = 0;
    postTaskStatus({ taskStatus, color, seq }, params.projectId);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Box onSubmit={submitHandler}>
        <Item>
          <label htmlFor="name">이름</label>
          <NameInput type="text" id="name" name="name" required />
        </Item>
        <Item>
          <label htmlFor="color">색상</label>
          <ColorInput type="color" name="color" id="color" required />
        </Item>
        <Buttons>
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button>추가</button>
        </Buttons>
      </Box>
    </Modal>
  );
}

const Box = styled.form`
  background-color: white;
  padding: 1rem 2rem;
  width: 30rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
`;

const Item = styled.p`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: #555;
  }
`;

const NameInput = styled.input`
  border-radius: 10px;
  border: 1px solid #555;
  height: 45px;
  padding: 10px;
  font-size: 1.2rem;
`;

const ColorInput = styled.input`
  border-radius: 10px;
  height: 40px;
  width: 40%;
  border: 1px solid #555;
  padding: 2px 3px;
  background: transparent;
  vertical-align: middle;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  height: 3rem;
  font-weight: bold;

  button {
    width: 5rem;
    border-radius: 10px;
    background-color: #4361ee;
    color: white;
    border: none;
    font-size: 1rem;
  }

  button:nth-child(1) {
    background-color: white;
    border: 1px solid #4361ee;
    color: #4361ee;
  }
`;
