import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    eventSource : null,
}


const eventSlice = createSlice({
    name : 'eventSource',
    initialState,
    reducers : {
        setEventSource : (state, action) => {
            state.eventSource = action.payload;
        }
    }
})

export const {

    setEventSource,

} = eventSlice.actions

export default eventSlice.reducer;