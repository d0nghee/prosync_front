import TaskForm from "../../components/task/form/TaskForm";
import { useDispatch } from "react-redux";
import { taskMembersAction } from "../../redux/reducers/task/taskMembers-slice";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskApi, getFileApi } from "../../util/api";
import { styled } from "styled-components";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { tryFunc } from "../../util/tryFunc";

export default function EditTask() {
  const dispatch = useDispatch();
  const [task, setTask] = useState();
  const params = useParams();
  const [taskFiles, setTaskFiles] = useState([]);
  const navigate = useNavigate();

  const deleteFile = (fileInfoId) => {
    let originalFiles = taskFiles;
    originalFiles = originalFiles.filter(
      (file) => file.fileInfoId !== fileInfoId
    );
    setTaskFiles(originalFiles);
  };

  useEffect(() => {
    tryFunc(
      async () => await getTaskApi(`${params.taskId}`),
      (response) => {
        if (response.data.projectId !== +params.projectId) {
          alert("접근 경로가 잘못되었습니다.");
          navigate("/");
        }
        setTask(response.data);
        dispatch(taskMembersAction.setTaskMembers(response.taskMembers));
      },
      dispatch
    )();

    tryFunc(
      async () => await getFileApi(params.taskId, "TASK"),
      (files) => setTaskFiles(files)
    )();
  }, [dispatch, params.taskId]);

  if (!task) {
    return <LoadingSpinner />;
  }

  return (
    <TaskSection>
      <TaskForm
        method="PATCH"
        task={task}
        taskFiles={taskFiles}
        deleteFile={deleteFile}
      />
    </TaskSection>
  );
}

const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 70%;
  margin-bottom: 15rem;
`;
