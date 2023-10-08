import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTaskApi,
  getTasksApi,
  patchTaskApi,
  postTaskApi,
} from "../../../util/api";
import { tryFunc } from "../../../util/tryFunc";

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    list: [],
    pageInfo: {},
  },
  reducers: {
    setTaskList(state, action) {
      state.list = action.payload.list;
      state.pageInfo = action.payload.pageInfo;
    },
    addTask(state, action) {
      state.list.push(action.payload);
    },
    updateTask(state, action) {
      const updatedTask = action.payload;
      let findIndex = state.list.findIndex(
        (task) => task.taskId === updatedTask.taskId
      );

      if (findIndex !== -1) {
        state.list[findIndex] = { ...state.list[findIndex], ...updatedTask };
      }
    },
    moveTask(state, action) {
      const { task, taskStatusId } = action.payload;
      const findOriginalIndex = state.list.findIndex(
        (status) => status.taskStatusId === task.taskStatusId
      );

      // 기존 상태에서 해당 업무 제거
      if (findOriginalIndex !== -1) {
        let newList = state.list[findOriginalIndex].list;
        if (newList.length === 1) {
          state.list = state.list.filter(
            (_, index) => index !== findOriginalIndex
          );
        } else {
          newList = newList.filter((one) => one.taskId !== task.taskId);
          state.list[findOriginalIndex].list = newList;
        }
      }

      // 새 상태에 해당 업무 추가
      const findNewIndex = state.list.findIndex(
        (status) => status.taskStatusId === taskStatusId
      );

      if (findNewIndex !== -1) {
        const newList = state.list[findNewIndex].list;
        newList.push(task);
        state.list[findNewIndex].list = newList;
      }
    },
    updateTaskSeq(state, action) {
      const statusList = action.payload;
      console.log(statusList, "상태 리스트 확인");
      statusList.forEach((one) => {
        const findIndex = state.list.findIndex(
          (status) => status.taskStatusId === one.taskStatusId
        );
        if (findIndex !== -1) {
          state.list[findIndex].seq = one.seq;
        }
      });
      const sortedList = state.list
        .filter((item) => item.seq !== 0)
        .sort((a, b) => a.seq - b.seq);
      const others = state.list.filter((item) => item.seq === 0);
      state.list = [...sortedList, ...others];
    },
  },
});

export const postTask = (projectId, taskStatusId, task) => {
  return async (dispatch) => {
    await tryFunc(
      () => postTaskApi(projectId, taskStatusId, task),
      (taskId) => {
        dispatch(taskListAction.addTask(...task, taskId));
      }
    )();
  };
};

export const patchTask = (taskId, task) => {
  return async (dispatch) => {
    await tryFunc(
      () => patchTaskApi(taskId, task),
      (response) => {
        dispatch(taskListAction.updateTask(task));
      }
    )();
  };
};

export const deleteTask = (taskId, projectId, params) => {
  return async (dispatch) => {
    await tryFunc(
      () => deleteTaskApi(taskId),
      (response) => dispatch(getTasks(projectId, params))
    )();
  };
};

export const getTasks = (projectId, params) => {
  return async (dispatch) => {
    await tryFunc(
      () => getTasksApi(projectId, params),
      (response) =>
        dispatch(
          taskListAction.setTaskList({
            list: response.data,
            pageInfo: response.pageInfo,
          })
        )
    )();
  };
};

export const taskListAction = taskListSlice.actions;

export default taskListSlice.reducer;
