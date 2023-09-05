import React from "react";
import { useLoaderData } from "react-router-dom";
import { getApi } from "../../util/api";
import TasksList from "./TasksList";

export default function Tasks() {
  const data = useLoaderData();
  const tasks = data.data;
  return (
    <>
      <TasksList tasks={tasks} />
    </>
  );
}

export async function loader({ params }) {
  const projectId = params.projectId;
  const response = await getApi(`/projects/${projectId}/tasks`);
  return response;
}
