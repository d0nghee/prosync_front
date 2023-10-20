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
    // board view에서 quit 회원 삭제 요청
    updateBoardTaskMembers(state, action) {
      const { memberProjectId, taskId } = action.payload;

      if (state.list.length !== 0) {
        state.list.forEach((statusList, index) => {
          try {
            const idx = statusList.list.findIndex(
              (task) => task.taskId === taskId
            );

            if (idx !== -1) {
              let taskMembers = statusList.list[idx].taskMembers;
              taskMembers = taskMembers.filter(
                (member) => member.memberProjectId !== memberProjectId
              );
              state.list[index].list[idx] = {
                ...statusList.list[idx],
                taskMembers,
              };
            }
          } catch (error) {}
        });
      }
    },

    moveTask(state, action) {
      let { task, taskStatusId } = action.payload;
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
        task = { ...task, taskStatusId: taskStatusId };
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
    let id = null;
    await tryFunc(
      () => postTaskApi(projectId, taskStatusId, task),
      (taskId) => {
        let newTask = task;
        newTask.taskId = taskId;
        dispatch(taskListAction.addTask(newTask));
        id = taskId;
      },
      dispatch
    )();
    return id;
  };
};

export const patchTask = (taskId, task) => {
  return async (dispatch) => {
    let success = false;
    await tryFunc(
      () => patchTaskApi(taskId, task),
      (response) => {
        dispatch(taskListAction.updateTask(task));
        success = true;
      },
      dispatch
    )();
    return success;
  };
};

export const deleteTask = (taskId, projectId, params) => {
  return async (dispatch) => {
    await tryFunc(
      () => deleteTaskApi(taskId),
      (response) => dispatch(getTasks(projectId, params)),
      dispatch
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
        ),
      dispatch
    )();
  };
};

export const taskListAction = taskListSlice.actions;

export default taskListSlice.reducer;
