import { createSlice } from '@reduxjs/toolkit';

const memberCheckboxSlice = createSlice({
  name: 'memberCheckbox',
  initialState: {
    checkbox: [],
  },
  reducers: {
    addCheckbox(state, action) {
      state.checkbox = { 0: { checked: false } };
      if (action.payload) {
        action.payload.forEach(
          (id) => (state.checkbox[id] = { checked: false })
        );
      }
    },
    toggleCheckbox(state, action) {
      const checkedId = action.payload.id;
      state.checkbox[checkedId].checked = !state.checkbox[checkedId].checked;
    },
    toggleAllItems(state) {
      const allChecked = !state.checkbox[0].checked;
      for (const id in state.checkbox) {
        state.checkbox[id].checked = allChecked;
      }
    },
  },
});

export const selectCheckbox = (state) => state.memberCheckbox;
export const { addCheckbox, toggleCheckbox, toggleAllItems } =
  memberCheckboxSlice.actions;
export default memberCheckboxSlice.reducer;
