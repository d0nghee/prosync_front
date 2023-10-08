import TaskForm from "../../components/task/form/TaskForm";
import { useDispatch } from "react-redux";
import { taskMembersAction } from "../../redux/reducers/task/taskMembers-slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskApi, getCommentsApi, getFileApi } from "../../util/api";
import CommentList from "../../components/comment/CommentList";
import { styled } from "styled-components";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { tryFunc } from "../../util/tryFunc";
import { useNavigate } from "react-router-dom";

export default function EditTask() {
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
  const [task, setTask] = useState();
  const params = useParams();
  const [comments, setComments] = useState();
  const [taskFiles, setTaskFiles] = useState([]);

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
        setTask(response.data);
        dispatch(taskMembersAction.setTaskMembers(response.taskMembers));
      },
      commonErrror
    )();

    tryFunc(
      async () => await getCommentsApi(`${params.taskId}`),
      (comments) => setComments(comments),
      commonErrror
    )();

    tryFunc(
      async () => await getFileApi(params.taskId, "TASK"),
      (files) => setTaskFiles(files),
      commonErrror
    );
  }, [dispatch, params.taskId]);

  const addComment = (comment) => {
    setComments((prv) => {
      const data = [...prv.data, comment];
      return { data, pageInfo: prv.pageInfo };
    });
  };

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
      <CommentList comments={comments} addComment={addComment} />
    </TaskSection>
  );
}

const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 70%;
`;
