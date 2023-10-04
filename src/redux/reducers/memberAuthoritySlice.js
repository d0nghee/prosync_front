import { createSlice } from '@reduxjs/toolkit';

const memberAuthoritySlice = createSlice({
  name: 'authority',
  initialState: {
    authority: [],
  },
  reducers: {
    addAuthority: (state, action) => {
      state.authority.push(action.payload);
      console.log('addAuthority payload:', action.payload);
    },
    removeAuthority: (state, action) => {
      console.log('removeAuthority state:', state.authority);

      const memberIdToRemove = action.payload;
      state.authority = state.authority.filter(
        (item) => item.memberProjectId !== memberIdToRemove
      );
      console.log('removeAuthority payload:', action.payload);
    },
  },
});

export const { addAuthority, removeAuthority } = memberAuthoritySlice.actions;

export const selectMembers = (state) => state.authority.authority;

export default memberAuthoritySlice.reducer;
