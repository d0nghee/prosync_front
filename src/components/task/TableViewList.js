import TaskStatus from "./TaskStatus";
import ProfileCard from "../common/ProfileCard";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkboxActions } from "../../redux/reducers/checkbox-slice";
import TaskMemberList from "./TaskMemberList";
import { CgSmileNone } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import * as t from "./TaskForm.style";
import { getProjectMembersApi } from "../../util/api";
import { AiFillCaretDown } from "react-icons/ai";
import TaskStatusList from "./TaskStatusList";

export default function TableViewList({ onChangePage, tasks }) {
  //TODO: 프로젝트쪽에서 프로젝트 회원 전역 관리하기
  const [projectMembers, setProjectMembers] = useState();
  const params = useParams();

  useEffect(() => {
    (async () => {
      setProjectMembers(await getProjectMembersApi(params.projectId));
    })();
  }, [params.projectId]);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const projectStatusList = useSelector((state) => state.taskStatus.list);

  // ------------------------------------ //

  const [showAssignees, setShowAssignees] = useState();
  const dispatch = useDispatch();
  console.log("view에서 확인", tasks);

  const showMembers = (id) => {
    setShowAssignees((prv) => {
      if (id === prv) {
        return undefined;
      } else {
        return id;
      }
    });
  };

  useEffect(() => {
    const taskIds = tasks.list.map((task) => task.taskId);
    dispatch(checkboxActions.addCheckbox(taskIds));
  }, [dispatch, tasks]);

  const toggleCheckbox = (id, e) => {
    dispatch(checkboxActions.toggleCheckbox(id));
  };

  const toggleAllCheck = (event) => {
    dispatch(checkboxActions.toggleAllItems());
  };

  const pageNumbers = Array.from(
    { length: tasks.pageInfo.totalPages },
    (_, index) => index + 1
  );

  const [editTaskId, setEditTaskId] = useState();

  return (
    <>
      <Header>
        <input type="checkbox" onChange={toggleAllCheck} />
        <Title>
          <div>제목</div>
          <div>담당자</div>
          <div>진행 기간</div>
          <div>업무상태</div>
          <div>분류</div>
        </Title>
      </Header>

      {/* TODO: 상태 컨텐츠 없음 확인 && 폼 제출 적용 */}
      {showStatusModal && (
        <>
          <t.BackDrop onClick={() => setShowStatusModal((prv) => !prv)} />
          <t.Wrapper show="true">
            <TaskStatusList
            // updateTaskStatus={updateTaskStatus}
            />
          </t.Wrapper>
        </>
      )}
      {tasks &&
        tasks.list.map((task) => (
          <Item key={task.taskId}>
            <input
              type="checkbox"
              onChange={(e) => toggleCheckbox({ id: task.taskId }, e)}
            />
            {task.taskId !== editTaskId ? (
              <Link to={`${task.taskId}`}>
                <Contents>
                  <input defaultValue={task.title} disabled={true} />
                  {task.taskMembers.length !== 0 ? (
                    <Assignee onClick={() => showMembers(task.taskId)}>
                      <ProfileCard
                        key={task.taskMembers[0].memberId}
                        name={task.taskMembers[0].name}
                        image={task.taskMembers[0].profileImage}
                      />
                    </Assignee>
                  ) : (
                    <div>
                      <CgSmileNone size="50px" />
                      <div>undefined</div>
                    </div>
                  )}
                  <div>
                    <input defaultValue={task.startDate} disabled={true} />
                    <input defaultValue={task.endDate} disabled={true} />
                  </div>
                  <div>
                    <TaskStatus color={task.color} name={task.taskStatus} />
                  </div>

                  <input
                    defaultValue={task.classification}
                    disabled={task.taskId !== editTaskId}
                  />
                </Contents>
              </Link>
            ) : (
              <Contents>
                <input defaultValue={task.title} disabled={false} />
                {task.taskMembers.length !== 0 ? (
                  <Assignee onClick={() => showMembers(task.taskId)}>
                    <ProfileCard
                      key={task.taskMembers[0].memberId}
                      name={task.taskMembers[0].name}
                      image={task.taskMembers[0].profileImage}
                    />
                  </Assignee>
                ) : (
                  <div>
                    <CgSmileNone size="50px" />
                    <div>undefined</div>
                  </div>
                )}
                {/* TODO: showAssignees 일때 담당자 선택창 */}
                {task.taskMembers.length !== 0 &&
                  showAssignees === task.taskId && (
                    <div>
                      <t.BackDrop
                        onClick={() => setShowAssignees((prv) => !prv)}
                      />
                      <t.Wrapper show="true">
                        <TaskMemberList
                          taskMembers={projectMembers}
                          isCheckList="true"
                          toggleList={() => setShowAssignees((prv) => !prv)}
                        />
                      </t.Wrapper>
                    </div>
                  )}
                <div>
                  <input defaultValue={task.startDate} disabled={false} />
                  <input defaultValue={task.endDate} disabled={false} />
                </div>
                {/* TODO: 클릭시 업무 상태 선택창 */}
                <div onClick={() => setShowStatusModal((prv) => !prv)}>
                  <TaskStatus color={task.color} name={task.taskStatus} />
                </div>
                <input
                  defaultValue={task.classification}
                  disabled={task.taskId !== editTaskId}
                />
              </Contents>
            )}
            <EditButton
              type="button"
              onClick={() => setEditTaskId(task.taskId)}
            >
              <FiEdit2 />
            </EditButton>
          </Item>
        ))}
      <Box>
        {pageNumbers.map((pageNum) => (
          <li key={pageNum}>
            <PageButton type="button" onClick={() => onChangePage(pageNum)}>
              {pageNum}
            </PageButton>
          </li>
        ))}
      </Box>
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

  input[type="checkbox"]:checked {
    background-color: #48cae4;
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
  a,
  input {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
    width: 100%;
    border: none;
  }

  input:nth-child(1) {
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

const Assignee = styled.div`
  display: flex;

  & > div {
    display: flex;
    width: 80%;
  }
`;

const Box = styled.ul`
  width: 85rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const PageButton = styled.button`
  padding: 1.3rem 1.5rem;
  font-size: 1.5rem;
  border: none;
  color: white;
  border-radius: 10px;
  background-color: #3a5a40;

  &:hover {
    opacity: 0.7;
  }
`;

const EditButton = styled.button`
  border: none;
`;
