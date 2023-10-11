import React, { useCallback, useEffect, useState } from 'react'
import { deleteApi, getApi, postApi } from '../../util/api'
import { useDispatch, useSelector } from 'react-redux';
import { selectBookCheck, setIsBookCheck, setPageInfo, setPostsData } from '../../redux/reducers/member/mypageSlice';
import { Container, BookmarkListItem, PaginationContainer, PageButton, ProjectTitle, PostDate, ListItemContainer, PostListContainer, PostItem, ProjectImage, NullPost, BookmarkWrapper } from '../../css/MyPageStyle'
import BookmarkIcon from './BookmarkIcon'
import Loading from '../common/Loading';
import { useNavigate, useRouteLoaderData, useLocation } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import styled from 'styled-components';


const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  font-size: 18px; // 글꼴 크기 감소
`;

const bookmarkIcon = {
  width: "20px",
  height: "20px"
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
    tryFunc(fetchSubscribe(idx), onFetchSubscribeSuccess, dispatch)();
  }, [subscribeState, currentPage]);

  const fetchBookmark = async () => {
    const res = await getApi(`/bookmark-list?page=${currentPage}`)
      .catch((res) => {
        if (res.code === "ERR_BAD_REQUEST") {
          alert("잘못된 요청입니다.");
        }
      });
    setLoading(false);
    return res.data;
  }

  const fetchSubscribe = async (projectId) => {

    dispatch(setIsBookCheck({ page: currentPage, projectId: projectId }))

    postApi(`/bookmark/${projectId}`)
      .catch((res) => {
        if (res.code === "ERR_BAD_REQUEST") {
          alert("잘못된 요청입니다.");
        }
      });
    setUse(!use);
    setLoading(false);
  }

  const onFetchSubscribeSuccess = () => {

  }


  const onFetchBookmarkSuccess = (data) => {
    const resbookmark = data.data;
    const pageInfo = data.pageInfo;
    let buttons = [];

    console.log(resbookmark);

    const items = resbookmark.map((post, idx) => {

      return (
        <PostItem
          key={post.bookmarkId}
        >
          <BookmarkWrapper>
            <StarButton
              onClick={() => subscribeFetch(post.projectId)}
            >
              <BookmarkIcon
                isBookCheck={subscribeState[currentPage]?.[post.projectId]}
                style={bookmarkIcon}
              />
            </StarButton>

            <ProjectTitle
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={hoverState[idx] ? HoverStyle : postTitleStyle}
              onClick={() => handleTitleClick(idx)}
            >
              {post.title}
            </ProjectTitle>
          </BookmarkWrapper>
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
    tryFunc(fetchBookmark, onFetchBookmarkSuccess, dispatch)();
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
