import { redirect, useRouteLoaderData, json } from "react-router-dom";
import { deleteApi, getApi } from "../../util/api";
import Task from "../../components/task/Task";

export default function TaskDetail() {
  const data = useRouteLoaderData("task-details");
  const task = data.data.data;
  const taskMembers = data.data.taskMembers;

  return <Task task={task} taskMembers={taskMembers} />;
}

export async function loader({ params }) {
  const taskId = params.taskId;
  const response = await getApi(`/tasks/${taskId}`);
  if (
    response.response &&
    (response.response.status === 500 || response.response.status === 404)
  ) {
    //TODO:재확인
    throw json(
      { status: response.response.status },
      { message: response.response.data.resultCode }
    );
  }
  return response;
}

export async function action({ params }) {
  deleteApi(`/tasks/${params.taskId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.error(error));

  return redirect("..");
}
