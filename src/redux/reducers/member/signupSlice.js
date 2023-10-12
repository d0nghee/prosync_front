import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        email: "",
        password: "",
        name: "",
        certificationNumber : "",
    },
    verifiedPassword: {
        verifypassword: "",
    },
    
    isEmailValid: false,
    isPasswordMatch: false,
    
    
};

export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setVerifiedPassword: (state, action) => {
            state.verifiedPassword = action.payload;
        },
        
        setIsEmailValid: (state, action) => {
            state.isEmailValid = action.payload;
        },
        setIsPasswordMatch: (state, action) => {
            state.isPasswordMatch = action.payload;
        },
       
        
    },
});



export const {
    setFormData,
    setVerifiedPassword,
    setIsEmailValid,
    setIsPasswordMatch,
  

} = signupSlice.actions;

export default signupSlice.reducer;