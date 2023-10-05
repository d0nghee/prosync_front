import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    selectedComponent : "InfoEdit",

    isAuthentication : false,

    memberInfo : {
        name : '',
        password : '',
        intro : '',
        profileImage : '',
        pw : '',
    },

    profileImage : false,

    postData : [

    ],
    pageInfo : {
        page : 1,
        size : 10,
        totalElements : 0,
        totalPages : 0,
    },

    isBookCheck : {
        
    },
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
        },
        setPostsData : (state, action) => {
            state.postData = action.payload;
        },
        setPageInfo : (state, action) => {
            state.pageInfo = action.payload;
        },
        setIsBookCheck : (state, action) => {
            const { bookmarkId } = action.payload;
            state.isBookCheck[bookmarkId] = !state.isBookCheck[bookmarkId];
        }
    }
})

export const {

    setSelectedComponent,    
    setIsAuthentication,
    setMemberInfo,
    setPostsData,
    setPageInfo,
    setIsBookCheck,


} = mypageSlice.actions

export default mypageSlice.reducer;