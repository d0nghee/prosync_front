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
    projectList : []
    ,
    projectListPageInfo : {
        page : 1,
        size : 10,
        totalElements : 0,
        totalPages : 0,
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
            state.isBookCheck = action.payload;
        },
        setProjectList : (state, action) => {
            state.projectList = action.payload;
        },
        setProjectListPageInfo : (state, action) => {
            state.projectListPageInfo = action.payload;
        }
    }
})

export const {

    setSelectedComponent,    
    setIsAuthentication,
    setMemberInfo,
    setPostsData,
    setPageInfo,
    setProjectList,
    setProjectListPageInfo,
    setIsBookCheck,

} = mypageSlice.actions

export const selectBookCheck = (state) => state.mypage.isBookCheck;

export default mypageSlice.reducer;