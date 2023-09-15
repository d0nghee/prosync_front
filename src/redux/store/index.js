import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";
import checkboxReducer from "../reducers/checkbox-slice";
import taskStatusReducer from "../reducers/taskStatus-slice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    checkbox: checkboxReducer,
    taskStatus: taskStatusReducer,
  },
});

export default store;
