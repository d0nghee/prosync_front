import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTaskApi,
  getTasksApi,
  patchTaskApi,
  postTaskApi,
} from "../../util/api";

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    list: [],
    pageInfo: {},
  },
  reducers: {
    setTaskList(state, action) {
      console.log("업무 리스트 초기 세팅");
      state.list = action.payload.list;
      state.pageInfo = action.payload.pageInfo;
    },
    addTask(state, action) {
      state.taskList.push(action.payload);
    },
    removeTask(state, action) {
      const taskId = action.payload;
      state.taskList = state.taskList.find((task) => task.taskId !== taskId);
    },
    updateTask(state, action) {
      //   const updatedTask = action.payload;
      //   const updatedIndex = state.taskList.findIndex(
      //     (task) => task.taskId === updatedTask.taskId
      //   );
      //   if (updatedIndex !== -1) {
      //     state.taskList = state.taskList.map((task, index) =>
      //       index === updatedIndex ? updatedTask : task
      //     );
      //   }
    },
  },
});

export const postTask = (projectId, taskStatusId, task) => {
  return async (dispatch) => {
    const taskId = await postTaskApi(projectId, taskStatusId, task);
    if (taskId) {
      await dispatch(taskListAction.addTask(...task, taskId));
    }
    return taskId;
  };
};

export const patchTask = (taskId, task) => {
  return async (dispatch) => {
    const response = await patchTaskApi(taskId, task);

    if (response) {
      await dispatch(taskListAction.updateTask(task));
    }
    return response;
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    const response = await deleteTaskApi(taskId);
    if (response && response.status === 204) {
      dispatch(taskListAction.removeTask(taskId));
    }
  };
};

export const getTasks = (projectId, params) => {
  return async (dispatch) => {
    const response = await getTasksApi(projectId, params);
    return await dispatch(
      taskListAction.setTaskList({
        list: response.data,
        pageInfo: response.pageInfo,
      })
    );
  };
};

export const taskListAction = taskListSlice.actions;

export default taskListSlice.reducer;
