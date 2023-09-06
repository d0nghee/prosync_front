import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: { show: false, startDate: null, endDate: null },
  reducers: {
    changeStartDate(state, action) {
      state.startDate = action.payload;
    },
    changeEndDate(state, action) {
      state.endDate = action.payload;
    },
    toggleCalendar(state) {
      state.show = !state.show;
    },
  },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice.reducer;
