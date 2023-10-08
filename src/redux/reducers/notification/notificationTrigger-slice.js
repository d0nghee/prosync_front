import { createSlice } from "@reduxjs/toolkit";

const triggerSlice = createSlice({
  name: "trigger",
  initialState: {
    trigger: false,
  },
  reducers: {
    setTrigger : (state) => {
      state.trigger = !state.trigger;
    },
  },
});

export const {setTrigger} = triggerSlice.actions;

export default triggerSlice.reducer;