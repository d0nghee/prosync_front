import { redirect, useParams } from "react-router-dom";
import { deleteApi, getFileApi, getTaskApi } from "../../util/api";
import Task from "../../components/task/form/Task";
import { useEffect, useState } from "react";
import CommentList from "../../components/comment/CommentList";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import axiosInstance from "../../util/axiosInstancs";
import { getCookie } from "../../util/cookies";

export default function TaskDetail() {
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

  const [task, setTask] = useState();
  const [taskFiles, setTaskFiles] = useState([]);
  const params = useParams();

  const deleteFile = (fileInfoId) => {
    let originalFiles = taskFiles;
    originalFiles = originalFiles.filter(
      (file) => file.fileInfoId !== fileInfoId
    );
    setTaskFiles(originalFiles);
  };

  const [projectMember, setProjectMember] = useState();

  useEffect(() => {
    (async () => {
      await tryFunc(
        () => getTaskApi(`${params.taskId}`),
        (task) => setTask(task),
        commonErrror
      )();
      await tryFunc(
        () => getFileApi(params.taskId, "TASK"),
        (taskFile) => {
          if (taskFile) {
            setTaskFiles(taskFile);
          }
        },
        commonErrror
      )();
      const memberId = getCookie("memberId");
      await tryFunc(
        () =>
          axiosInstance.get(
            `/projects/${params.projectId}/members/${memberId}`
          ),
        (response) => setProjectMember(response.data)
      )();
    })();
  }, [params.taskId]);

  return (
    <>
      <TaskSection>
        <Task
          task={task}
          taskFiles={taskFiles}
          deleteFile={deleteFile}
          projectMember={projectMember}
        />
        {/* 댓글 목록 */}
        <CommentList projectMember={projectMember} />
      </TaskSection>
    </>
  );
}

export async function action({ params }) {
  deleteApi(`/tasks/${params.taskId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.error(error));

  return redirect("..");
}

const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
`;
