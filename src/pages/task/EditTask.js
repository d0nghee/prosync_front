import { useRouteLoaderData } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";

export default function EditTask() {
  const data = useRouteLoaderData("task-details");
  const task = data.data.data;
  const taskMembers = data.data.taskMembers;

  return (
    <>
      <TaskForm method="PATCH" task={task} taskMembers={taskMembers} />
    </>
  );
}
