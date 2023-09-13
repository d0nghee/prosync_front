import { createSlice } from "@reduxjs/toolkit";

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
    toggleList(state) {
      state.show = !state.show;
    },
  },
});

export const taskStatusActions = taskStatusSlice.actions;

export default taskStatusSlice.reducer;
