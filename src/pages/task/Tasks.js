import React from "react";
import { useParams } from "react-router-dom";
import TasksList from "../../components/task/TasksList";
import TaskNavigation from "../../components/task/TaskNavigation";
import TaskSearchBar from "../../components/task/TaskSearchBar";
import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../../redux/reducers/taskList-slice";
import { useSelector } from "react-redux";

export default function Tasks() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList.list);

  const params = useParams();
  const [keyword, setKeyword] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState();

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const changeKeywordHandler = (value) => {
    setKeyword(value);
  };

  useEffect(() => {
    (async () => {
      dispatch(
        getTasks(params.projectId, {
          search: keyword,
          page: currentPage,
        })
      ).then((taskList) => {
        setTasks(taskList.payload);
      });
    })();
  }, [dispatch, params.projectId, keyword, currentPage]);

  return (
    <TaskView>
      <TaskSearchBar
        updateSearch={changeKeywordHandler}
        onChangePage={(value) => handleCurrentPage(value)}
      />
      <TaskNavigation />
      <TasksList onChangePage={handleCurrentPage} tasks={tasks} />
    </TaskView>
  );
}

const TaskView = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;
