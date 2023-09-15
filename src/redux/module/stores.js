import { configureStore } from "@reduxjs/toolkit";
import signupReducer from '../signupSlice';
import loginReducer from '../loginSlice';
import mypageSlice from "../mypageSlice";

const rootReducer = {
    signup: signupReducer,
    login: loginReducer,
    mypage : mypageSlice,
};

export const stores = configureStore({
    reducer : rootReducer,
})

export default stores;