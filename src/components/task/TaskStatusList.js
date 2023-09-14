import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";
import { useState } from "react";
import { deleteTaskStatusApi } from "../../util/api";
import { useDispatch, useSelector } from "react-redux";
import { taskStatusActions } from "../../redux/reducers/taskStatus-slice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

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

  const statusClickHandler = (taskStatus) => {
    updateTaskStatus({
      taskStatusId: taskStatus.taskStatusId,
      taskStatus: taskStatus.taskStatus,
      color: taskStatus.color,
    });
  };

  return (
    <StatusBox>
      <p>Apply status to this task</p>
      <StatusItems>
        {statusList.map((taskStatus) => (
          <OneBox key={taskStatus.taskStatusId}>
            <div onClick={() => statusClickHandler(taskStatus)}>
              <TaskStatus
                color={taskStatus.color}
                name={taskStatus.taskStatus}
              />
            </div>
            {editStatus ? (
              <RiDeleteBin6Line
                onClick={() => deleteTaskStatus(taskStatus.taskStatusId)}
                size="20px"
              />
            ) : (
              <BsCheck
                onClick={() => statusClickHandler(taskStatus)}
                size="20px"
              />
            )}
          </OneBox>
        ))}
      </StatusItems>
      <Buttons>
        <button type="button" onClick={editStatusHandler}>
          {editStatus ? (
            "done"
          ) : (
            <span>
              <FiEdit2 />
              edit
            </span>
          )}
        </button>
        {editStatus && (
          <button type="button" onClick={showStatusModal}>
            add
          </button>
        )}
      </Buttons>
    </StatusBox>
  );
}

const Buttons = styled.div`
  display: flex;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  button {
    height: 100%;
    font-size: 1rem;
    padding: 5px;
    overflow: hidden;
    background-color: white;
    border: none;
    width: 100%;
    font-weight: bold;
  }

  button:nth-child(2) {
    border-left: 1px solid gray;
  }
`;

const StatusBox = styled.div`
  width: 250px;
  max-height: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid #c0c0c0;
  margin-top: 3px;

  p {
    font-weight: bold;
    text-align: center;
    margin-bottom: 0;
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
