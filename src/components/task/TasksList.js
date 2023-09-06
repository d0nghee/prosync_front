import { Link } from "react-router-dom";
import { styled } from "styled-components";
import TaskStatus from "./TaskStatus";

export default function TasksList({ tasks }) {
  //TODO: 체크박스 로직 추가하기
  return (
    <div>
      <Header>
        <input type="checkbox" />
        <div>
          <span>Task title</span>
          <span>Assignees</span>
          <span>Last Updated</span>
          <span>Status</span>
          <span>Classification</span>
        </div>
      </Header>
      {tasks.data.map((task) => (
        <Item key={task.taskId}>
          <input type="checkbox" />
          <ContentLink to={`${task.taskId}`}>
            <div>{task.title}</div>
            <div>
              {task.startDate} - {task.endDate}
            </div>
            <div>{task.modifiedAt}</div>
            <TaskStatus color={task.color} name={task.taskStatus} />
            <div>{task.classification}</div>
          </ContentLink>
        </Item>
      ))}
    </div>
  );
}

const Header = styled.div`
  width: 85rem;
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

  div {
    display: flex;
    width: 83rem;
    border-radius: 1rem;
    margin: 0 0.5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }

  div > span {
    flex: 1;
  }

  div > span:nth-child(1) {
    flex: 1.5;
  }
`;

const Item = styled.div`
  width: 85rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;

  input {
    width: 20px;
  }
`;

const ContentLink = styled(Link)`
  display: flex;
  width: 83rem;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
    color: #007bff;
    border-radius: 1.5rem;
    padding: 0 2rem;
  }

  div {
    display: inline-block;
    flex: 1;
  }

  div:nth-child(1) {
    flex: 1.5;
  }
`;
