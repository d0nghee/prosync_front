import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/task/calendar-slice";
import taskStatusReducer from "../reducers/task/taskStatus-slice";
import taskMembersReducer from "../reducers/task/taskMembers-slice";
import taskListReducer from "../reducers/task/taskList-slice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    taskStatus: taskStatusReducer,
    taskMembers: taskMembersReducer,
    taskList: taskListReducer,
  },
});

export default store;
