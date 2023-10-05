import { configureStore, createStore } from '@reduxjs/toolkit';
import calendarReducer from '../reducers/calendar-slice';
import checkboxReducer from '../reducers/checkbox-slice';
import taskStatusReducer from '../reducers/taskStatus-slice';
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
    checkbox: checkboxReducer,
    taskStatus: taskStatusReducer,
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
