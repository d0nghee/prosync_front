import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxes: [{ id: 0, checked: false }],
  allChecked: false,
};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    addCheckbox(state, action) {
      console.log("add box");
      state.checkboxes.push({ id: action.payload, checked: false });
    },
    toggleCheckbox(state, action) {
      console.log("toggle one check box");
      const checkedId = action.payload.id;
      const items = state.checkboxes;
      items.forEach((one, idx) => {
        if (one["id"] === checkedId) {
          state.checkboxes[idx].checked = !state.checkboxes[idx].checked;
        }
      });
    },
    toggleAllItems(state) {
      console.log("toggle all check boxes");
      const allChecked = !state.allChecked;
      state.checkboxes.forEach((item, idx) => {
        state.checkboxes[idx].checked = allChecked;
      });
      state.allChecked = allChecked;
    },
  },
});

export const checkboxActions = checkboxSlice.actions;

export default checkboxSlice.reducer;
