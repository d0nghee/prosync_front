import { configureStore, createStore } from '@reduxjs/toolkit';
import calendarReducer from '../reducers/task/calendar-slice';
import taskStatusReducer from '../reducers/task/taskStatus-slice';
import taskMembersReducer from '../reducers/task/taskMembers-slice';
import taskListReducer from '../reducers/task/taskList-slice';
import signupReducer from '../reducers/member/signupSlice';
import loginReducer from '../reducers/member/loginSlice';
import memberAuthoritySlice from '../reducers/member/memberAuthoritySlice';
import mypageReducer from '../reducers/member/mypageSlice';
import triggerReducer from '../reducers/notification/notificationTrigger-slice';
import errorReducer from '../reducers/error/error-slice';
import sideBarReducer from '../reducers/common/sidebar-slice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    taskStatus: taskStatusReducer,
    taskMembers: taskMembersReducer,
    taskList: taskListReducer,
    signup: signupReducer,
    login: loginReducer,
    mypage: mypageReducer,
    trigger: triggerReducer,
    authority: memberAuthoritySlice,
    error: errorReducer,
    sidebarOpenClose: sideBarReducer,
  },
});

export default store;
