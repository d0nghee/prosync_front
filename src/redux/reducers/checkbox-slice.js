import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxes: { 0: { checked: false } },
};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    addCheckbox(state = initialState, action) {
      state.checkboxes = { 0: { checked: false } };
      if (action.payload) {
        action.payload.forEach(
          (id) => (state.checkboxes[id] = { checked: false })
        );
      }
    },
    toggleCheckbox(state, action) {
      const checkedId = action.payload.id;
      state.checkboxes[checkedId].checked =
        !state.checkboxes[checkedId].checked;
    },
    toggleAllItems(state) {
      const allChecked = !state.checkboxes[0].checked;
      for (const id in state.checkboxes) {
        state.checkboxes[id].checked = allChecked;
      }
    },
  },
});

export const checkboxActions = checkboxSlice.actions;

export default checkboxSlice.reducer;
