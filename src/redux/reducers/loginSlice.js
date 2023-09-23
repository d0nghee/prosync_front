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
        setIsLoggedIn : (state) => {
           state.isLoggedIn = !state.isLoggedIn; 
        }
       
    }
})



export const {
    
    setLoginFormData,
    setIsLoggedIn,

} = loginSlice.actions

export default loginSlice.reducer;