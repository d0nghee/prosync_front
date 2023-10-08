import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hasError: false,
    errorData: null,
    errorMessage: '',
}



const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            console.log('setError 동작중');
            console.log(action.payload);

            if (state.hasError) return;
            state.hasError = true;
            state.errorData = action.payload.errorData;
            state.errorMessage = action.payload.errorMessage;
        },
        clearError: (state) => {
            state.hasError = false;
            state.errorData = null;
            state.errorMessage = '';
        },
    },
});



export const {
    
    setError,
    clearError,

} = errorSlice.actions;

export default errorSlice.reducer;