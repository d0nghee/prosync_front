import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Modal from "../../components/task/Modal";
import { postTaskStatusApi } from "../../util/api";
import { useDispatch } from "react-redux";
import { taskStatusActions } from "../../redux/reducers/taskStatus-slice";

export default function NewTaskStatus({ onClose }) {
  const params = useParams();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const color = event.target[1].value;
    const taskStatus = event.target[0].value;
    const seq = 0;
    (async () => {
      const taskStatusId = await postTaskStatusApi(
        { taskStatus, color, seq },
        params.projectId
      );
      if (taskStatusId) {
        dispatch(
          taskStatusActions.addStatus({
            taskStatusId,
            taskStatus,
            color,
          })
        );
      }
    })();

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Box onSubmit={submitHandler}>
        <Item>
          <label htmlFor="name">status</label>
          <NameInput
            type="text"
            id="name"
            name="name"
            required
            placeholder="업무상태를 입력하세요."
          />
        </Item>
        <Item>
          <label htmlFor="color">color</label>
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
  padding: 1rem;
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
    color: #6d6a75;
    font-weight: bold;
  }
`;

const NameInput = styled.input`
  border: none;
  border-bottom: 1px solid #cad2c5;
  height: 40px;
  padding: 10px;
  font-size: 1.2rem;
`;

const ColorInput = styled.input`
  border-radius: 5px;
  height: 40px;
  width: 30%;
  border: 1px solid #555;
  background: transparent;
  vertical-align: middle;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  height: 3rem;
  font-weight: bold;

  button {
    width: 5rem;
    border-radius: 2rem;
    background-color: #6d6a75;
    color: white;
    border: none;
    font-size: 1rem;
  }

  button:nth-child(1) {
    background-color: white;
    border: 1px solid #6d6a75;
    color: #6d6a75;
  }
`;
