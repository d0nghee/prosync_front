import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    show: false,
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  },
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
    changeDatesAndShow(state, action) {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
      state.show = !state.show;
    },
  },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice.reducer;
