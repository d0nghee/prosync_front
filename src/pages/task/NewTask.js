import React from "react";
import TaskForm from "../../components/task/TaskForm";
import { useRouteLoaderData } from "react-router-dom";

export default function NewTask() {
  return <TaskForm method="POST" />;
}
