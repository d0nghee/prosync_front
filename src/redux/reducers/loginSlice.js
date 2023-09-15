import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginFormData : {
        email : '',
        password : '',
    },
    isLoggedIn : false,
}


const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
    
        setLoginFormData : (state, action) => {
            state.loginFormData = action.payload;
        },
        setLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload;
        }
       
    }
})



export const {
    
    setLoginFormData,
    setLoggedIn

} = loginSlice.actions

export default loginSlice.reducer;