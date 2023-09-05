import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { getApi } from "../../util/api";
import Task from "./Task";

export default function TaskDetail() {
  const data = useRouteLoaderData("task-detail");
  const task = data.data.data;
  return (
    <>
      <Task task={task} />
    </>
  );
}

export async function loader({ params }) {
  const taskId = params.taskId;
  const response = await getApi(`/tasks/${taskId}`);
  return response;
}
