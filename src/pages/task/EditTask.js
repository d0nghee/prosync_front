import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";

export default function EditTask() {
  const data = useRouteLoaderData("task-details");
  const task = data.data.data;
  return <TaskForm task={task} method="PATCH" />;
}
