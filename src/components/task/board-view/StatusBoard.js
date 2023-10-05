import TaskCard from "./TaskCard";
import { styled } from "styled-components";
import { patchTaskApi } from "../../../util/api";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../../util/tryFunc";

export default function StatusBoard({ list, projectMember }) {
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
                task={task}
                key={task.taskId}
                dragStart={handleDragStart}
              />
            ))}
          </Board>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 100%;
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
