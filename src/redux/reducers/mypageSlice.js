import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    selectedComponent : "InfoEdit",
    isAuthentication : false,
    memberInfo : {
        name : '',
        password : '',
        intro : '',
        profileImage : '',
    },
    profileImage : false,

}


const mypageSlice = createSlice({
    name : 'mypage',
    initialState,
    reducers : {
        setSelectedComponent : (state, action) => {
            state.selectedComponent = action.payload;
        },
        setIsAuthentication : (state, action) => {
            state.isAuthentication = action.payload;
        },
        setMemberInfo : (state, action) => {
            state.memberInfo = action.payload;
        }
    }
})

export const {

    setSelectedComponent,    
    setIsAuthentication,
    setMemberInfo,

} = mypageSlice.actions

export default mypageSlice.reducer;