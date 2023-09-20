import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        email: "",
        password: "",
        name: "",
    },
    verifiedPassword: {
        verifypassword: "",
    },
    isConfirmModalOpen: false,
    modalCheck: "",
    modalMessage: "",
    modalButtons: [],
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
        setIsConfirmModalOpen: (state, action) => {
            state.isConfirmModalOpen = action.payload;
        },
        setModalCheck: (state, action) => {
            state.modalCheck = action.payload;
        },
        setModalMessage: (state, action) => {
            state.modalMessage = action.payload;
        },
        setModalButtons: (state, action) => {
            state.modalButtons = action.payload;
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
    setIsConfirmModalOpen,
    setModalCheck,
    setModalMessage,
    setModalButtons,
    setIsEmailValid,
    setIsPasswordMatch,

} = signupSlice.actions;

export default signupSlice.reducer;