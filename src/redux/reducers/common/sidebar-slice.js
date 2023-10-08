import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebarOpenClose",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setOpenClose : (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {setOpenClose} = sidebarSlice.actions;

export default sidebarSlice.reducer;