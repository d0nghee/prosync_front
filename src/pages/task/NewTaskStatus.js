import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Modal from "../../components/task/common/Modal";
import { postTaskStatusApi } from "../../util/api";
import { useDispatch } from "react-redux";
import {
  patchStatus,
  taskStatusActions,
} from "../../redux/reducers/task/taskStatus-slice";
import { tryFunc } from "../../util/tryFunc";
import { useNavigate } from "react-router-dom";
import { taskListAction } from "../../redux/reducers/task/taskList-slice";
import { useSelector } from "react-redux";

export default function NewTaskStatus({ onClose, editTask }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const colorRef = useRef();
  const taskList = useSelector((state) => state.taskList.list);

  const params = useParams();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const color = event.target[1].value;
    const taskStatus = event.target[0].value;
    const seq = 0;

    tryFunc(
      async () =>
        await postTaskStatusApi({ taskStatus, color, seq }, params.projectId),
      (taskStatusId) => {
        dispatch(
          taskStatusActions.addStatus({
            taskStatusId,
            taskStatus,
            color,
          })
        );
      }
    )();

    onClose();
  };

  const editHandler = (event) => {
    // 업무 상태 수정
    dispatch(
      patchStatus({
        taskStatusId: editTask.taskStatusId,
        color: colorRef.current.value,
        taskStatus: nameRef.current.value,
      })
    );
    // 해당 상태값을 가진 업무 리스트 업데이트
    const findTask = taskList.filter(
      (task) => task.taskStatusId === editTask.taskStatusId
    );
    findTask.forEach((task) => {
      const updatedTask = { ...task, taskStatus: nameRef.current.value };
      dispatch(taskListAction.updateTask(updatedTask));
    });

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
            defaultValue={editTask ? editTask.taskStatus : ""}
            ref={nameRef}
          />
        </Item>
        <Item>
          <label htmlFor="color">color</label>
          <ColorInput
            type="color"
            name="color"
            id="color"
            required
            defaultValue={editTask ? editTask.color : ""}
            ref={colorRef}
          />
        </Item>
        <Buttons>
          <button type="button" onClick={onClose}>
            취소
          </button>
          {!editTask ? (
            <button>추가</button>
          ) : (
            <button type="button" onClick={editHandler}>
              수정
            </button>
          )}
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
