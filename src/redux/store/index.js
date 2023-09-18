import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";
import checkboxReducer from "../reducers/checkbox-slice";
import taskStatusReducer from "../reducers/taskStatus-slice";
import signupReducer from "../reducers/signupSlice";
import loginReducer from '../reducers/loginSlice';
import mypageSlice from "../reducers/mypageSlice";






const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    checkbox: checkboxReducer,
    taskStatus: taskStatusReducer,
    signup: signupReducer,
    login: loginReducer,
    mypage : mypageSlice,
  },
});

export default store;
