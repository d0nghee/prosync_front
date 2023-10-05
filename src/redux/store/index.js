import { configureStore, createStore } from '@reduxjs/toolkit';
import calendarReducer from '../reducers/task/calendar-slice';
import taskStatusReducer from "../reducers/task/taskStatus-slice";
import taskMembersReducer from '../reducers/task/taskMembers-slice';
import taskListReducer from '../reducers/task/taskList-slice';
import signupReducer from '../reducers/signupSlice';
import loginReducer from '../reducers/loginSlice';
import mypageSlice from '../reducers/mypageSlice';
import memberCheckboxSlice from '../reducers/memberCheckboxSlice';
import memberAuthoritySlice from '../reducers/memberAuthoritySlice';
import mypageReducer from '../reducers/mypageSlice';
import triggerReducer from '../reducers/notificationTrigger-slice';
import errorReducer from '../reducers/error-slice';


export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    taskStatus: taskStatusReducer,
    taskMembers: taskMembersReducer,
    taskList: taskListReducer,
    signup: signupReducer,
    login: loginReducer,
    mypage: mypageReducer,
    trigger : triggerReducer,
    authority: memberAuthoritySlice,
    memberCheckbox: memberCheckboxSlice,
    error: errorReducer,
  },
});

export default store;
