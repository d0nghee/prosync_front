import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";
import checkboxReducer from "../reducers/checkbox-slice";
import taskStatusReducer from "../reducers/taskStatus-slice";
import taskMembersReducer from "../reducers/taskMembers-slice";
import taskListReducer from "../reducers/taskList-slice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    checkbox: checkboxReducer,
    taskStatus: taskStatusReducer,
    taskMembers: taskMembersReducer,
    taskList: taskListReducer,
  },
});

export default store;
