import React, { useEffect, useState } from 'react'
import { getApi } from '../../../util/api'
import { useDispatch, useSelector } from 'react-redux';
import { setIsBookCheck, setPageInfo, setPostsData } from '../../../redux/reducers/mypageSlice';
import { Container, BookmarkListItem, PaginationContainer, PageButton, PostTitle, PostDate, ListItemContainer } from '../../../css/MyPageStyle'
import BookmarkIcon from './BookmarkIcon';
import Loading from '../../../components/common/Loading';
import { useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const navi = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverState, setHoverState] = useState(Array(mypage.postData.length).fill(false));

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

  const handleSubscribe = (idx) => {
    const bookmarkId = mypage.postData[idx].bookmarkId;
    dispatch(setIsBookCheck( { bookmarkId } ));
    console.log(mypage.postData[idx])
  }

  const handleTitleClick = (idx) => {
    let projectId = mypage.postData[idx].projectId;
    navi(`/projects/${projectId}/tasks`);
  }

  useEffect(() => {
    setLoading(true);
    getApi(`/bookmark-list?page=${currentPage}`)
      .then((res) => {
        dispatch(setPageInfo(res.data.pageInfo));
        dispatch(setPostsData(res.data.data));

      }).catch(error => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })
  }, [currentPage, dispatch]);


  const getList = () => {

    return mypage.postData.map((post, idx) =>
      <BookmarkListItem
        id={post.bookmarkId}
        key={post.bookmarkId}
      >
        <ListItemContainer>
          <BookmarkIcon
            style={bookmarkIcon}
            onClick={() => handleSubscribe(idx)}
            isBookCheck={mypage.isBookCheck[mypage.postData[idx].bookmarkId]}
          />

          <PostTitle
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            style={hoverState[idx] ? HoverStyle : postTitleStyle}
            onClick={() => handleTitleClick(idx)}
          >
            {post.title}
          </PostTitle>
        </ListItemContainer>
        <PostDate>
          {post.created_at[0]}.
          {post.created_at[1]}.{post.created_at[2]} {post.created_at[3]}
        </PostDate>

      </BookmarkListItem>)
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
      <Container>
        {getList()}
        <PaginationContainer>
          {paginationButtons}
        </PaginationContainer>
      </Container>

      {loading && <Loading />}
    </>
  )
}
