import TaskStatus from "./TaskStatus";
import ProfileCard from "../common/ProfileCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkboxActions } from "../../redux/reducers/checkbox-slice";

export default function TableViewList({ tasks }) {
  const [showAssignees, setShowAssignees] = useState(false);
  const dispatch = useDispatch();

  const showHandler = () => {
    setShowAssignees((prv) => !prv);
  };

  useEffect(() => {
    tasks.data.map((task) => {
      dispatch(checkboxActions.addCheckbox(task.taskId));
    });
  }, [tasks]);

  // 체크박스
  const checkboxes = useSelector((state) => state.checkboxes);
  const toggleCheckbox = (id) => {
    dispatch(checkboxActions.toggleCheckbox(id));
  };

  return (
    <>
      {tasks.data.map((task) => (
        <Item key={task.taskId}>
          <input type="checkbox" onChange={() => toggleCheckbox(task.taskId)} />
          <Contents>
            <Link to={`${task.taskId}`}>
              <div>{task.title} </div>
            </Link>

            {task.taskMembers.length !== 0 ? (
              <ProfileCard
                key={task.taskMembers[0].memberId}
                name={task.taskMembers[0].name}
                image={task.taskMembers[0].profileImage}
              />
            ) : (
              <div>none</div>
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

            <Link to={`${task.taskId}`}>
              <div>{task.modifiedAt}</div>
            </Link>

            <Link to={`${task.taskId}`}>
              <div>
                <TaskStatus color={task.color} name={task.taskStatus} />
              </div>
            </Link>
            <Link>
              <div>{task.classification} </div>
            </Link>
          </Contents>
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

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Contents = styled.div`
  display: flex;
  width: 83rem;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  align-items: center;

  div,
  a {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
  }

  a:nth-child(1) {
    flex: 1.5;
  }
`;
