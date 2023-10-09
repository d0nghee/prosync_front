import TaskCard from "./TaskCard";
import { styled } from "styled-components";
import { patchTaskApi } from "../../../util/api";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../../util/tryFunc";
import * as tv from "../table-view/TableViewList.style";
import * as t from "../form/TaskForm.style";
import TaskMemberList from "../common/TaskMemberList";
import { useState } from "react";

export default function StatusBoard({ list, projectMember, wid }) {
  const [showId, setShowId] = useState();
  const navigate = useNavigate();
  const commonErrror = {
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (error) => {
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate(`/auth?mode=login`);
    },
    403: (error) => {
      console.log(error.response.status);
      alert("해당 메뉴에 대한 접근 권한이 없습니다.");
      navigate("/");
    },
  };

  const dispatch = useDispatch();
  const handleDragStart = (event, task) => {
    if (
      projectMember &&
      projectMember.status === "ACTIVE" &&
      (projectMember.authority === "ADMIN" ||
        projectMember.authority === "WRITER")
    ) {
      event.dataTransfer.setData("task", task);
    }
  };

  const handleDrop = (event, taskStatusId) => {
    event.preventDefault();
    if (
      projectMember &&
      projectMember.status === "ACTIVE" &&
      (projectMember.authority === "ADMIN" ||
        projectMember.authority === "WRITER")
    ) {
      let task = event.dataTransfer.getData("task");

      if (task) {
        task = JSON.parse(task);
        tryFunc(
          async () => await patchTaskApi(task.taskId, { taskStatusId }),
          (response) =>
            dispatch(taskListAction.moveTask({ task, taskStatusId })),
          commonErrror
        )();
      }
    } else {
      alert("프로젝트 수정 권한이 없습니다.");
    }
  };

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const showHandler = (e, taskId) => {
    console.log("쇼 실행");
    setShowId(taskId);

    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log(scrollTop, "scroll top");
    console.log(cardRect.top, "cardrect.top");
    setModalPosition({
      top: scrollTop + cardRect,
      left: cardRect.left,
    });
    console.log(cardRect.top + scrollTop - 600 + "px", "test");
  };
  const closeHandler = () => {
    setShowId();
  };

  return (
    <>
      {list && list.list && (
        <Container
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, list.taskStatusId)}
        >
          <BoardTitle color={list.color}>{list.taskStatus}</BoardTitle>
          <Board>
            {list.list.map((task) => (
              <div>
                <div>
                  <TaskCard
                    task={task}
                    key={task.taskId}
                    dragStart={handleDragStart}
                    showHandler={(e) => showHandler(e, task.taskId)}
                  />
                </div>

                {showId === task.taskId && (
                  <ModalSection>
                    {/* TODO 백드롭 x축 포함해서 다시.. */}
                    <BackDrop onClick={closeHandler} />

                    <t.Wrapper show="true" customtop={modalPosition.top}>
                      <TaskMemberList
                        taskMembers={task.taskMembers}
                        taskId={task.taskId}
                      />
                    </t.Wrapper>
                  </ModalSection>
                )}
              </div>
            ))}
          </Board>
        </Container>
      )}
    </>
  );
}

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ModalSection = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 5px solid orange;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 1200px;
  // position: relative;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  width: 100%;
`;

const BoardTitle = styled.h2`
  color: white;
  background-color: ${(props) => props.color || "white"};
  padding: 1.1rem;
  border-radius: 10px;
`;
