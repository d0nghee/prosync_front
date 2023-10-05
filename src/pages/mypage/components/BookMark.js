import React, { useCallback, useEffect, useState } from 'react'
import { deleteApi, getApi, postApi } from '../../../util/api'
import { useDispatch, useSelector } from 'react-redux';
import { selectBookCheck, setIsBookCheck, setPageInfo, setPostsData } from '../../../redux/reducers/mypageSlice';
import { Container, BookmarkListItem, PaginationContainer, PageButton, PostTitle, PostDate, ListItemContainer, PostListContainer, PostItem } from '../../../css/MyPageStyle'
import BookmarkIcon from './BookmarkIcon';
import Loading from '../../../components/common/Loading';
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom';
import { getCookie } from '../../../util/cookies';
import { tryFunc } from '../../../util/tryFunc';
import { setIsLoggedIn } from '../../../redux/reducers/loginSlice';


const bookmarkIcon = {
  marginRight: "10px",
  cursor: "pointer",
}

const postTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "5px",
  cursor: "pointer",
}

const HoverStyle = {
  ...postTitleStyle,
  textDecoration: 'underline',
}

export default function BookMark() {

  const location = useLocation();
  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const navi = useNavigate();
  const subscribeState = useSelector(selectBookCheck);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [hoverState, setHoverState] = useState(Array(mypage.postData.length).fill(false));
  const [bookmarkState, setBookmarkState] = useState(Array(mypage.postData.length).fill(false));

  const paginationButtons = [];


  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const handleMouseEnter = (idx) => {
    const newHoverState = [...hoverState];
    newHoverState[idx] = true;
    setHoverState(newHoverState);

  }

  const handleMouseLeave = (idx) => {
    const newHoverState = [...hoverState];
    newHoverState[idx] = false;
    setHoverState(newHoverState);

  }



  const handleTitleClick = (idx) => {
    let projectId = mypage.postData[idx].projectId;
    navi(`/projects/${projectId}/tasks`);
  }

  const bookmarkFetch = useCallback(() => {
    tryFunc(fetchBookmark, onFetchBookmarkSuccess, onFetchBookmarkErrorHandler)();
  }, [mypage.postData, currentPage])

  const subscribeFetch = useCallback((idx) => {
    tryFunc(fetchSubscribe(idx), onFetchSubscribeSuccess, onFetchBookmarkErrorHandler)();
  }, [subscribeState, currentPage]);

  const fetchBookmark = async () => {
    const res = await getApi(`/bookmark-list?page=${currentPage}`);
    setLoading(false);
    return res.data;
  }

  const fetchSubscribe = async (idx) => {

    let projectId = mypage.postData[idx].projectId;

    dispatch(setIsBookCheck({ page: currentPage, projectId: projectId }))



    if (bookmarkState[idx] === true) {

      postApi(`/bookmark/${projectId}`)


    } else if (bookmarkState[idx] === false) {

      deleteApi(`/bookmark/${projectId}`)

    }

  }

  const onFetchSubscribeSuccess = () => {

  }

  const onFetchBookmarkErrorHandler = {
    500: (err) => {
      console.log("loading : ", loading);
      setLoading(false);
      console.log("Server Error : ", err);
      alert("서버에서 오류가 발생했습니다.")
    },
    401: (err) => {
      console.log(err.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      setIsLoggedIn(false);
      navi(
        `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
      );
    },
    default: (err) => {
      console.error("Unknown error : ", err);
      alert("요청 중 오류가 발생했습니다.");
    }
  }

  const onFetchBookmarkSuccess = (data) => {
    setLoading(false);
    console.log("success : " + data);
    dispatch(setPageInfo(data.pageInfo));
    dispatch(setPostsData(data.data));
  }

  useEffect(() => {
    setLoading(true);
    bookmarkFetch();
  }, [subscribeState, currentPage, subscribeFetch]);


  const getList = () => {

    return mypage.postData.map((post, idx) =>
      <PostItem
        id={post.bookmarkId}
        key={post.bookmarkId}
      >
        <ListItemContainer>
          <BookmarkIcon
            style={bookmarkIcon}
            onClick={() => subscribeFetch(idx)}
            isBookCheck={subscribeState[currentPage]?.[post.projectId]}
          />

          <PostTitle
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            style={hoverState[idx] ? HoverStyle : postTitleStyle}
            onClick={() => handleTitleClick(idx)}
          >
            {post.projectId}
            {post.title}
          </PostTitle>
        </ListItemContainer>
        <PostDate>
          {/* {post.created_at[0]}.
          {post.created_at[1]}.
          {post.created_at[2]} &nbsp;/ &nbsp; 
          {post.created_at[3]} 시
          {post.created_at[4]} 분
            */}
        </PostDate>

      </PostItem>)
  }



  for (let i = 1; i <= mypage.pageInfo.totalPages; i++) {

    paginationButtons.push(

      <PageButton
        key={i}
        onClick={() => handlePageChange(i)}
        disabled={i === currentPage}
      >
        {i}
      </PageButton>

    )

  }



  return (
    <>
      <PostListContainer>
        {getList()}
      </PostListContainer>
      <PaginationContainer>
        {paginationButtons}
      </PaginationContainer>

      {loading && <Loading />}
    </>
  )
}
