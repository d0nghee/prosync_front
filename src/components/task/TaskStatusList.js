import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";

export default function TaskStatusList({
  taskStatusList,
  updateTaskStatus,
  showList,
}) {
  return (
    <StatusBox>
      <p>Apply status to this task</p>
      <Filter type="text" placeholder="Filter status" />
      <StatusItems>
        {taskStatusList.map((taskStatus) => (
          <div
            key={taskStatus.taskStatusId}
            onClick={() =>
              updateTaskStatus({
                id: taskStatus.taskStatusId,
                name: taskStatus.taskStatus,
                color: taskStatus.color,
              })
            }
          >
            <TaskStatus color={taskStatus.color} name={taskStatus.taskStatus} />
          </div>
        ))}
      </StatusItems>
      <button>edit status</button>
    </StatusBox>
  );
}

const StatusBox = styled.div`
  width: 220px;
  max-height: 500px;
  border: 1px solid #dad7cd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  button {
    height: 40px;
    font-size: 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: white;
    border-color: #dad7cd;
  }

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
    margin-bottom: 10px;
  }

  div:hover {
    transform: scale(1.05);
    opacity: 0.7;
  }
`;

const Filter = styled.input`
  height: 45px;
  padding: 10px;
  font-size: 1rem;
  margin: 10px 10px 0px 10px;
  border-radius: 15px;
  border-color: #dad7cd;
`;
