import TaskStatus from "./TaskStatus";
import ProfileCard from "../common/ProfileCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";

export default function TableViewList({ tasks }) {
  const [showAssignees, setShowAssignees] = useState(false);

  const showHandler = () => {
    setShowAssignees((prv) => !prv);
  };

  return (
    <>
      {tasks.data.map((task) => (
        <Item key={task.taskId}>
          <input type="checkbox" />
          <ContentLink to={`${task.taskId}`}>
            <div>{task.title}</div>
            {task.taskMembers.length !== 0 ? (
              <ProfileCard
                key={task.taskMembers[0].memberId}
                name={task.taskMembers[0].name}
                image={task.taskMembers[0].profileImage}
              />
            ) : (
              <div>담당자 없음</div>
            )}
            {/* TODO: 담당자 클릭시 담당자 체크박스 목록 */}
            {showAssignees &&
              task.taskMembers.map((member) => (
                <ProfileCard
                  key={member.memberId}
                  name={member.name}
                  image={member.profileImage}
                />
              ))}
            <div>{task.modifiedAt}</div>
            <TaskStatus color={task.color} name={task.taskStatus} />
            <div>{task.classification}</div>
          </ContentLink>
        </Item>
      ))}
    </>
  );
}

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

//TODO: LINK
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
  }

  div {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
  }

  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  div:nth-child(1) {
    flex: 1.5;
  }

  div:nth-child(4) {
    flex: 0.7;
    margin-right: 5rem;
  }
`;
