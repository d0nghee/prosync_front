import TaskCard from "./TaskCard";
import { styled } from "styled-components";
import { patchTaskApi } from "../../../util/api";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useDispatch } from "react-redux";
import { tryFunc } from "../../../util/tryFunc";

export default function StatusBoard({ list, projectMember }) {
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
            dispatch(taskListAction.moveTask({ task, taskStatusId }))
        )();
      }
    } else {
      alert("프로젝트 수정 권한이 없습니다.");
    }
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
              <TaskCard
                key={task.taskId}
                task={task}
                dragStart={handleDragStart}
              />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 100%;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  width: 100%;
  padding-bottom: 20rem;
`;

const BoardTitle = styled.h2`
  color: white;
  background-color: ${(props) => props.color || "white"};
  padding: 1.1rem;
  border-radius: 10px;
`;
