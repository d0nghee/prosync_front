import { createSlice } from "@reduxjs/toolkit";
import {
  getTaskStatusApi,
  patchTaskStatusApi,
  patchTaskStatusSeqApi,
} from "../../../util/api";
import { tryFunc } from "../../../util/tryFunc";

// taskStatusId, taskStatus, color,
const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState: {
    show: false,
    list: [],
    seqList: [],
  },
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
    removeStatus(state, action) {
      const statusId = action.payload;
      state.list = state.list.filter(
        (status) => status.taskStatusId !== statusId
      );
    },
    addStatus(state, action) {
      const newStatus = action.payload;
      state.list.push(newStatus);
    },
    updateStatus(state, action) {
      const updatedStatus = action.payload;
      const findIndex = state.list.findIndex(
        (status) => status.taskStatusId === updatedStatus.taskStatusId
      );
      if (findIndex !== -1) {
        state.list[findIndex] = { ...state.list[findIndex], ...updatedStatus };
      }
    },
    updateSeqOfCheckedStatus(state, action) {
      const selectedStatusId = action.payload;

      const findStatus = state.list.find(
        (one) => one.taskStatusId === selectedStatusId
      );
      if (findStatus) {
        // 체크되지 않은 경우
        if (findStatus.seq === 0) {
          let max = 0;
          state.list.forEach((one) => {
            if (one.seq > max) {
              max = one.seq;
            }
          });
          findStatus.seq = max + 1;
        } else {
          // 체크된 경우
          findStatus.seq = 0;
        }
      }
    },
    updateSeqOfStatusBoard(state, action) {
      const { taskStatusId, seq } = action.payload;

      const findStatus = state.list.find(
        (one) => one.taskStatusId === taskStatusId
      );
      const originalSeq = findStatus.seq;

      if (findStatus) {
        findStatus.seq = seq;
        state.seqList.push({
          taskStatusId: findStatus.taskStatusId,
          seq,
        });
      }

      state.list.forEach((one) => {
        if (one.taskStatusId !== taskStatusId && one.seq !== 0) {
          // 뒤로 보내기
          if (originalSeq < seq) {
            if (one.seq > originalSeq && one.seq <= seq) {
              console.log("뒤로 보내기");
              console.log(one.taskStatus + ", " + one.taskStatusId);
              one.seq--;
              state.seqList.push({
                taskStatusId: one.taskStatusId,
                seq: one.seq,
              });
            }
          }
          // 앞으로 보내기
          else if (originalSeq > seq) {
            if (one.seq >= seq && one.seq < originalSeq) {
              console.log("앞으로 보내기");
              console.log(one.taskStatus + ", " + one.taskStatusId);
              one.seq++;
              state.seqList.push({
                taskStatusId: one.taskStatusId,
                seq: one.seq,
              });
            }
          }
        }
      });
    },
    toggleList(state) {
      state.show = !state.show;
    },
    resetSeqList(state) {
      state.seqList = [];
    },
  },
});

export const getTaskStatus = (projectId) => {
  return async (dispatch) => {
    await tryFunc(
      () => getTaskStatusApi(projectId),
      (response) => dispatch(taskStatusActions.setList(response)),
      dispatch
    )();
  };
};

export const patchSequenceOfStatus = (taskStatusId, sequence, projectId) => {
  return async (dispatch, getState) => {
    // 뷰 공통 - status filter
    if (!sequence) {
      await dispatch(taskStatusActions.updateSeqOfCheckedStatus(taskStatusId));

      const updatedList = getState().taskStatus.list;
      const updatedStatus = updatedList.find(
        (one) => one.taskStatusId === taskStatusId
      );

      if (updatedStatus) {
        const seq = updatedStatus.seq;
        await tryFunc(
          () => patchTaskStatusApi(taskStatusId, { seq }),
          () => {},
          dispatch
        )();
      }
    } else {
      // 보드뷰 - 보드 순서 변경
      await dispatch(
        taskStatusActions.updateSeqOfStatusBoard({
          taskStatusId,
          seq: sequence,
        })
      );

      const seqList = getState().taskStatus.seqList;

      if (seqList.length !== 0) {
        await tryFunc(
          () => patchTaskStatusSeqApi(projectId, seqList),
          () => {
            dispatch(taskStatusActions.resetSeqList());
          },
          dispatch
        )();
      }
    }
  };
};

export const patchStatus = (taskStatus) => {
  return async (dispatch) => {
    await tryFunc(
      () =>
        patchTaskStatusApi(taskStatus.taskStatusId, {
          color: taskStatus.color,
          seq: null,
          taskStatus: taskStatus.taskStatus,
        }),
      () => {
        dispatch(taskStatusActions.updateStatus(taskStatus));
        alert("수정이 완료되었습니다.");
      },
      dispatch
    )();
  };
};

export const taskStatusActions = taskStatusSlice.actions;

export default taskStatusSlice.reducer;
