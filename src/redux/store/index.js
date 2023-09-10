import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendar-slice";
import checkboxReducer from "../reducers/checkbox-slice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    checkbox: checkboxReducer,
  },
});

export default store;
