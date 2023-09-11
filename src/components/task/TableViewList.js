import TaskStatus from "./TaskStatus";
import ProfileCard from "../common/ProfileCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkboxActions } from "../../redux/reducers/checkbox-slice";
import TaskMemberList from "./TaskMemberList";
import { AiFillCaretDown } from "react-icons/ai";

export default function TableViewList({ tasks }) {
  const [showAssignees, setShowAssignees] = useState(false);
  const dispatch = useDispatch();

  const showMembers = () => {
    setShowAssignees((prv) => !prv);
  };

  useEffect(() => {
    const taskIds = tasks.data.map((task) => task.taskId);
    dispatch(checkboxActions.addCheckbox(taskIds));
  }, [dispatch, tasks]);

  const toggleCheckbox = (id, e) => {
    dispatch(checkboxActions.toggleCheckbox(id));
  };

  const toggleAllCheck = (event) => {
    dispatch(checkboxActions.toggleAllItems());
  };

  return (
    <>
      <Header>
        <input type="checkbox" onChange={toggleAllCheck} />
        <Title>
          <div>Title</div>
          <div>Assignees</div>
          <div>Last Updated</div>
          <div>Status</div>
          <div>Classification</div>
        </Title>
      </Header>
      {tasks.data.map((task) => (
        <Item key={task.taskId}>
          <input
            type="checkbox"
            onChange={(e) => toggleCheckbox({ id: task.taskId }, e)}
          />
          <Contents>
            <Link to={`${task.taskId}`}>
              <div>{task.title} </div>
            </Link>
            {task.taskMembers.length !== 0 ? (
              <div onClick={showMembers}>
                <ProfileCard
                  key={task.taskMembers[0].memberId}
                  name={task.taskMembers[0].name}
                  image={task.taskMembers[0].profileImage}
                />
                <AiFillCaretDown size="27px" color="#6c757d" />
              </div>
            ) : (
              <div>none</div>
            )}

            {/* TODO: 담당자 api 요청 추가 */}
            {task.taskMembers.length !== 0 && showAssignees && (
              <TaskMemberWrapper>
                <TaskMemberList taskMembers={task.taskMembers} />
              </TaskMemberWrapper>
            )}

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
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  align-items: center;

  div {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
  }

  div:nth-child(1) {
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
  position: relative;

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

const TaskMemberWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 320px;
  z-index: 1;
  width: 250px;
  padding: 1rem;
`;
