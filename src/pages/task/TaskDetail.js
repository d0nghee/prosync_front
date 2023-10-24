import { redirect, useNavigate, useParams } from "react-router-dom";
import { deleteApi, getFileApi, getTaskApi } from "../../util/api";
import Task from "../../components/task/form/Task";
import { useEffect, useState } from "react";
import CommentList from "../../components/comment/CommentList";
import { styled } from "styled-components";
import { tryFunc } from "../../util/tryFunc";
import axiosInstance from "../../util/axiosInstances";
import { getCookie } from "../../util/cookies";
import { useDispatch } from "react-redux";

export default function TaskDetail() {
  const [task, setTask] = useState();
  const [taskFiles, setTaskFiles] = useState([]);
  const params = useParams();

  const deleteFile = (fileId) => {
    let originalFiles = taskFiles;
    originalFiles = originalFiles.filter((file) => file.fileId !== fileId);
    setTaskFiles(originalFiles);
  };

  const [projectMember, setProjectMember] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await tryFunc(
        () => getTaskApi(`${params.taskId}`),
        (task) => {
          if (task.data.projectId != +params.projectId) {
            alert("접근 경로가 잘못되었습니다.");
            navigate("/");
          }
          setTask(task);
        },
        dispatch
      )();
      await tryFunc(
        () => getFileApi(params.taskId, "TASK"),
        (taskFile) => {
          if (taskFile) {
            setTaskFiles(taskFile);
          }
        },
        dispatch
      )();
      const memberId = getCookie("memberId");

      try {
        const response = await axiosInstance.get(
          `/projects/${params.projectId}/members/${memberId}`
        );
        setProjectMember(await response.data);
      } catch (error) {
        console.log("GUEST");
      }
    })();
  }, [params.projectId, params.taskId]);

  return (
    <>
      <TaskSection>
        <Task
          task={task}
          taskFiles={taskFiles}
          deleteFile={deleteFile}
          projectMember={projectMember}
          updateTask={(value) => setTask(value)}
        />
        {/* 댓글 목록 */}
        {task && <CommentList projectMember={projectMember} />}
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
