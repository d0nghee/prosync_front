import { configureStore, createStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";
import checkboxReducer from "../reducers/checkbox-slice";
import taskStatusReducer from "../reducers/taskStatus-slice";
import signupReducer from "../reducers/signupSlice";
import loginReducer from '../reducers/loginSlice';
import mypageReducer from '../reducers/mypageSlice';
import triggerReducer from '../reducers/notificationTrigger-slice';




export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    checkbox: checkboxReducer,
    taskStatus: taskStatusReducer,
    signup: signupReducer,
    login: loginReducer,
    mypage : mypageReducer,
    trigger : triggerReducer,
  },
});

export default store;
