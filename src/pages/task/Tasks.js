import React from "react";
import { useLoaderData } from "react-router-dom";
import { getApi } from "../../util/api";
import TasksList from "../../components/task/TasksList";
import TaskNavigation from "../../components/task/TaskNavigation";
import TaskSearchBar from "../../components/task/TaskSearchBar";
import { styled } from "styled-components";

export default function Tasks() {
  const data = useLoaderData();
  const tasks = data.data;
  return (
    <TaskView>
      <TaskSearchBar/>
      <TaskNavigation/>
      <TasksList tasks={tasks} />
    </TaskView>
  );
}

export async function loader({ params }) {
  const projectId = params.projectId;
  const response = await getApi(`/projects/${projectId}/tasks`);
  return response;
}


const TaskView = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`