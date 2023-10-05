import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../util/cookies";


const initialState = {
    loginFormData : {
        email : '',
        password : '',
    },
    isLoggedIn: !!getCookie("accessToken"),
}


const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
    
        setLoginFormData : (state, action) => {
            state.loginFormData = action.payload;
        },
        setIsLoggedIn : (state, action) => {
           state.isLoggedIn = action.payload;
        }
       
    }
})



export const {
    
    setLoginFormData,
    setIsLoggedIn,

} = loginSlice.actions

export default loginSlice.reducer;