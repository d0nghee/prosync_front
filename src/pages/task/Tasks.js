import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getApi } from "../../util/api";
import TasksList from "../../components/task/TasksList";
import TaskNavigation from "../../components/task/TaskNavigation";
import TaskSearchBar from "../../components/task/TaskSearchBar";
import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function Tasks() {
  const data = useLoaderData();
  let tasks = data.data;
  const params = useParams();
  const [keyword, setKeyword] = useState(null);
  const [taskList, setTaskList] = useState(tasks);

  const changeKeywordHandler = (value) => {
    setKeyword(value);
  };

  useEffect(() => {
    // TODO: 처음 2번 요청되는 문제 해결
    (async () => {
      const response = await getApi(`/projects/${params.projectId}/tasks`, {
        params: {
          search: keyword,
        },
      });
      const tasks = await response.data;
      setTaskList(tasks);
    })();
  }, [keyword, params.projectId]);

  return (
    <TaskView>
      <TaskSearchBar updateSearch={changeKeywordHandler} />
      <TaskNavigation />
      <TasksList tasks={taskList} />
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
`;