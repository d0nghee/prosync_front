import React, { useCallback, useEffect, useState } from 'react'
import { deleteApi, getApi, postApi } from '../../util/api'
import { useDispatch, useSelector } from 'react-redux';
import { selectBookCheck, setIsBookCheck, setPageInfo, setPostsData } from '../../redux/reducers/member/mypageSlice';
import { Container, BookmarkListItem, PaginationContainer, PageButton, ProjectTitle, PostDate, ListItemContainer, PostListContainer, PostItem, ProjectImage, NullPost } from '../../css/MyPageStyle'
import BookmarkIcon from './BookmarkIcon'
import Loading from '../common/Loading';
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import { setIsLoggedIn } from '../../redux/reducers/member/loginSlice';


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

export default function BookMark(props) {


  const location = useLocation();
  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const navi = useNavigate();
  const subscribeState = useSelector(selectBookCheck);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverState, setHoverState] = useState(Array(mypage.postData.length).fill(false));
  const [buttons, setButtons] = useState([]);
  const [use, setUse] = useState(false);
  const [items, setItems] = useState([]);

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

  const subscribeFetch = useCallback((idx) => {
    tryFunc(fetchSubscribe(idx), onFetchSubscribeSuccess, onFetchBookmarkErrorHandler)();
  }, [subscribeState, currentPage]);

  const fetchBookmark = async () => {
    const res = await getApi(`/bookmark-list?page=${currentPage}`);
    setLoading(false);
    return res.data;
  }

  const fetchSubscribe = async (projectId) => {

    dispatch(setIsBookCheck({ page: currentPage, projectId: projectId }))

    postApi(`/bookmark/${projectId}`);
    setUse(!use);
    setLoading(false);
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
    console.log("데이터", data)
    const resbookmark = data.data;
    const pageInfo = data.pageInfo;
    let buttons = [];

    console.log(resbookmark);

    const items = resbookmark.map((post, idx) => {

      return (
        <PostItem
          key={post.bookmarkId}
        >

          <BookmarkIcon
            style={bookmarkIcon}
            onClick={() => subscribeFetch(post.projectId)}
            isBookCheck={subscribeState[currentPage]?.[post.projectId]}
          />

          <ProjectTitle
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            style={hoverState[idx] ? HoverStyle : postTitleStyle}
            onClick={() => handleTitleClick(idx)}
          >
            {post.title}
          </ProjectTitle>
          <ProjectImage
            src={post.projectImage}
            onClick={() => handleTitleClick(idx)}
          >

          </ProjectImage>

        </PostItem>
      )
    })

    for (let i = 1; i <= pageInfo.totalPages; i++) {
      buttons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </PageButton>
      )

      setLoading(false);
    }
    setItems(items);
    setButtons(buttons);
    dispatch(setPageInfo(data.pageInfo));
    dispatch(setPostsData(data.data));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const nextPage = parseInt(pageParam);
      setCurrentPage(nextPage);
    }
  }, [location.search])

  useEffect(() => {
    setLoading(true);
    tryFunc(fetchBookmark, onFetchBookmarkSuccess, onFetchBookmarkErrorHandler)();
  }, [subscribeState, currentPage, use]);



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
      {loading && <Loading />}
      {items.length === 0 ? (
        <>
          <NullPost>
            
              북마크한 프로젝트가 없습니다.
            
          </NullPost>
        </>
      ) : (
        <>
          <PostListContainer>
            {items}
          </PostListContainer>
          <PaginationContainer>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {buttons}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === mypage.pageInfo.totalPages}
            >
              Next
            </button>
          </PaginationContainer>
        </>
      )}

    </>
  )
}
