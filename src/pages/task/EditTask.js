import TaskForm from "../../components/task/TaskForm";
import { useDispatch } from "react-redux";
import { taskMembersAction } from "../../redux/reducers/taskMembers-slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskApi } from "../../util/api";

export default function EditTask() {
  const dispatch = useDispatch();
  const [task, setTask] = useState();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const response = await getTaskApi(`${params.taskId}`);

      setTask(response.data);
      dispatch(taskMembersAction.setTaskMembers(response.taskMembers));
    })();
  }, [dispatch, params.taskId]);

  return (
    <>
      <TaskForm method="PATCH" task={task} />
    </>
  );
}
