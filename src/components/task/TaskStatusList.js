import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";
import { useState } from "react";
import { deleteTaskStatusApi } from "../../util/api";
import { useDispatch, useSelector } from "react-redux";
import { taskStatusActions } from "../../redux/reducers/taskStatus-slice";

export default function TaskStatusList({ showStatusModal, updateTaskStatus }) {
  const [editStatus, setEditState] = useState(false);
  const editStatusHandler = () => {
    setEditState((prv) => !prv);
  };

  const dispatch = useDispatch();
  const statusList = useSelector((state) => state.taskStatus.list);

  const deleteTaskStatus = (statusId) => {
    (async () => {
      const response = await deleteTaskStatusApi(statusId);
      if (response.response && response.response.status === 409) {
        alert("업무상태를 사용하는 업무가 존재합니다.");
      } else {
        const proceed = window.confirm("정말 삭제하시겠습니까?");
        if (proceed) {
          dispatch(taskStatusActions.removeStatus(statusId));
        }
      }
    })();
  };

  return (
    <StatusBox>
      <p>Apply status to this task</p>
      <StatusItems>
        {statusList.map((taskStatus) => (
          <OneBox key={taskStatus.taskStatusId}>
            <div
              onClick={() =>
                updateTaskStatus({
                  id: taskStatus.taskStatusId,
                  name: taskStatus.taskStatus,
                  color: taskStatus.color,
                })
              }
            >
              <TaskStatus
                color={taskStatus.color}
                name={taskStatus.taskStatus}
              />
            </div>
            {editStatus ? (
              <div onClick={() => deleteTaskStatus(taskStatus.taskStatusId)}>
                X
              </div>
            ) : (
              ""
            )}
          </OneBox>
        ))}
      </StatusItems>
      <Buttons>
        <button type="button" onClick={editStatusHandler}>
          {editStatus ? "완료" : "수정"}
        </button>
        {editStatus ? (
          <button type="button" onClick={showStatusModal}>
            추가
          </button>
        ) : undefined}
      </Buttons>
    </StatusBox>
  );
}

//TODO : CSS STYLE 변경
const Buttons = styled.div`
  display: flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  button {
    height: 100%;
    font-size: 20px;
    overflow: hidden;
    background-color: white;
    border-color: #dad7cd;
    width: 100%;
  }
`;

const StatusBox = styled.div`
  width: 220px;
  max-height: 500px;
  border: 1px solid #dad7cd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  p {
    font-weight: bold;
    text-align: center;
    margin: 5px 0;
  }
`;

const StatusItems = styled.div`
  height: 100%;
  padding: 2rem;
  overflow: auto;
  border-bottom: 1px solid gray;

  div {
    margin-bottom: 5px;
  }

  div:hover {
    transform: scale(1.05);
    opacity: 0.7;
  }
`;

const OneBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  div:nth-child(1) {
    flex: 10;
  }

  div:nth-child(2) {
    flex: 1;
  }
`;
