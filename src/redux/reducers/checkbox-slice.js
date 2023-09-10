import { createSlice } from "@reduxjs/toolkit";

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState: {
    checkboxes: [{ id: 0, checked: false }],
  },
  reducers: {
    addCheckbox(state, action) {
      const newCheckbox = {
        id: action.payload,
        checked: false,
      };

      return { checkboxes: [...state.checkboxes, newCheckbox] };
    },
    toggleCheckbox(state, action) {
      // console.log(action.payload);
      // if (action.payload === 0) {
      //   state.checkboxes.map((one) => ({
      //     ...one, checked: one[]
      //   }))
      // }
      state.checkboxes.map((one) =>
        one.id === action.payload ? { ...one, checked: !one.checked } : one
      );
    },
  },
});

export const checkboxActions = checkboxSlice.actions;

export default checkboxSlice.reducer;
