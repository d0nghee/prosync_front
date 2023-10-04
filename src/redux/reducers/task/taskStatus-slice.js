import { createSlice } from "@reduxjs/toolkit";
import { getTaskStatusApi, patchTaskStatusApi } from "../../../util/api";
import { tryFunc } from "../../../util/tryFunc";

// taskStatusId, taskStatus, color,
const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState: {
    show: false,
    list: [],
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
      let findStatus = state.list.filter(
        (status) => status.taskStatusId === updatedStatus.taskStatusId
      );
      findStatus = { ...updatedStatus };
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

      //TODO
      // 업무 상태 순서 변경하는 경우 - 순서 일괄 변경
      // 마지막 - 기존 seq 보다 큰 것들 -1
      // 중간 1_ origi seq < new seq (뒤로 보내기) => 기존 seq 초과이고 새 seq 이하인것들 -1
      // 중간 2_ origi seq > new seq (앞으로 보내기) => 새 seq 이상이고 기존 seq 미만인것들 + 1

      const findStatus = state.list.find(
        (one) => one.taskStatusId === taskStatusId
      );

      if (findStatus) {
        findStatus.seq = seq;
      }
      state.list.forEach((one) => {
        if (one.taskStatusId !== taskStatusId && one.seq !== 0) {
        }
      });
    },
    toggleList(state) {
      state.show = !state.show;
    },
  },
});

export const getTaskStatus = (projectId) => {
  return async (dispatch) => {
    await tryFunc(
      () => getTaskStatusApi(projectId),
      (response) => dispatch(taskStatusActions.setList(response))
    )();
  };
};

export const patchSequenceOfStatus = (taskStatusId, sequence, last) => {
  return async (dispatch, getState) => {
    console.log(taskStatusId, sequence, last, "순서 확인");

    // 뷰 공통 - status filter
    if (!sequence) {
      await dispatch(taskStatusActions.updateSeqOfCheckedStatus(taskStatusId));
    } else {
      // 보드뷰 - 보드 순서 변경
      await dispatch(
        taskStatusActions.updateSeqOfStatusBoard({
          taskStatusId,
          seq: sequence,
        })
      );
    }

    const updatedList = getState().taskStatus.list;
    const updatedStatus = updatedList.find(
      (one) => one.taskStatusId === taskStatusId
    );

    if (updatedStatus) {
      const seq = updatedStatus.seq;
      await tryFunc(
        () => patchTaskStatusApi(taskStatusId, { seq }),
        () => {}
      )();
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
      }
    )();
  };
};

export const taskStatusActions = taskStatusSlice.actions;

export default taskStatusSlice.reducer;
