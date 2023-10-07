import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskMemberApi, postTaskMemberApi } from "../../../util/api";
import { tryFunc } from "../../../util/tryFunc";

const taskMembersSlice = createSlice({
  name: "taskMembers",
  initialState: {
    originalMembers: [],
    checkedMembers: [],
  },
  reducers: {
    setTaskMembers(state, action) {
      state.originalMembers = action.payload;
      state.checkedMembers = action.payload;
    },
    addTaskMember(state, action) {
      const newTaskMember = action.payload;
      state.checkedMembers.push(newTaskMember);
    },
    removeTaskMember(state, action) {
      const memberProjectId = action.payload;
      state.checkedMembers = state.checkedMembers.find(
        (member) => member.memberProjectId !== memberProjectId
      );
    },
    checkTaskMemberAction(state, action) {
      const checkMember = action.payload;
      const findOne = state.checkedMembers.filter(
        (one) => one.memberProjectId === checkMember.memberProjectId
      );
      // 체크된 사용자면 체크 해제
      if (findOne.length !== 0) {
        state.checkedMembers = state.checkedMembers.filter(
          (one) => one.memberProjectId !== checkMember.memberProjectId
        );
      } else {
        state.checkedMembers = [...state.checkedMembers, checkMember]; // 새로 체크된 사용자는 체크
      }
    },
    resetCheckedMember(state) {
      state.checkedMembers = state.originalMembers;
    },
  },
});

export const requestApi = (taskId, originalMembers, checkedMembers) => {
  const assignedIds = originalMembers.map((one) => one.memberProjectId);
  const checkedMemberIds = checkedMembers.map((one) => one.memberProjectId);
  // 기존 담당자 체크 해제된 경우 삭제 요청
  const deleteIds = assignedIds.filter(
    (one) => !checkedMemberIds.includes(one)
  );
  // 기존 담당자 아닌 경우 추가 요청
  const addIds = checkedMemberIds.filter((one) => !assignedIds.includes(one));
  return async (dispatch) => {
    if (deleteIds.length !== 0) {
      await tryFunc(
        () => deleteTaskMemberApi(taskId, { projectMemberIds: deleteIds }),
        () => {}
      )();
    }
    if (addIds.length !== 0) {
      await tryFunc(
        () => postTaskMemberApi(taskId, { projectMemberIds: addIds }),
        () => {}
      )();
    }
    //초기화
    dispatch(taskMembersAction.setTaskMembers([]));
  };
};

export const taskMembersAction = taskMembersSlice.actions;

export default taskMembersSlice.reducer;
