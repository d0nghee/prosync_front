import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxes: [{ id: 0, checked: false }],
  allChecked: false,
};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    addCheckbox(state = initialState, action) {
      console.log("add box");
      if (action.payload) {
        state.checkboxes = [{ id: 0, checked: false }];
        state.allChecked = false;
        action.payload.forEach((id) =>
          state.checkboxes.push({ id, checked: false })
        );
      }
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
