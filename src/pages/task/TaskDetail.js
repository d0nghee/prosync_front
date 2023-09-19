import { redirect, useParams } from "react-router-dom";
import { deleteApi, getTaskApi } from "../../util/api";
import Task from "../../components/task/Task";
import { useEffect, useState } from "react";

export default function TaskDetail() {
  const [task, setTask] = useState();
  const params = useParams();
  useEffect(() => {
    (async () => {
      const response = await getTaskApi(`${params.taskId}`);
      setTask(response);
    })();
  }, [params.taskId]);

  return <Task task={task} />;
}

export async function action({ params }) {
  deleteApi(`/tasks/${params.taskId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.error(error));

  return redirect("..");
}
