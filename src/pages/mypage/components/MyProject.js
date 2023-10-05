import React, { useCallback, useEffect, useState } from 'react'
import { deleteApi, getApi, postApi } from '../../../util/api'
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectBookCheck, setIsBookCheck, setProjectList, setProjectListPageInfo } from '../../../redux/reducers/mypageSlice';
import { PostItem, Container, PageButton, PaginationContainer, PostTitle, PostListContainer, ProjectTitle, PostDescription, ProjectImage } from '../../../css/MyPageStyle';
import BookmarkIcon from './BookmarkIcon';
import { tryFunc } from '../../../util/tryFunc';
import { setIsLoggedIn } from '../../../redux/reducers/loginSlice';
import Loading from '../../../components/common/Loading';
import { getCookie } from '../../../util/cookies';

const bookmarkIcon = {
  marginRight: "10px",
  cursor: "pointer",
}


export default function MyProject(props) {

  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const navi = useNavigate();
  const location = useLocation();


  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribe, setSubscribe] = useState({});
  const [hoverState, setHoverState] = useState(false);
  const [projectList, setProjectList] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [bookmarkList, setBookmarkList] = useState();
  const paginationButtons = [];


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');

    if (pageParam) {
      const nextPage = parseInt(pageParam);
      setCurrentPage(nextPage);
    }
  }, [location.search])

  useEffect(() => {
    async function fetchData() {
      bookmarkFetch();
      myprojectFetch();
      console.log("실행");
    }

     fetchData();
  } ,[])

  useEffect(() => {
    setIsLoading(true);
    bookmarkFetch();
    myprojectFetch();
    setIsLoading(false);
  }, [location.search, currentPage]);

  useEffect(() => {
    book();
  }, [location.search, currentPage, bookmarkList]);


  const page = () => {
    if (pageInfo && pageInfo.totalPages) {
      for (let i = 1; i <= pageInfo.totalPages; i++) {
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
      return paginationButtons;
    }
  }

  const book = () => {
    if (bookmarkList && projectList) {
      const bookmarkProjectId = bookmarkList.data.map(book => book.projectId);
      const update = {};

      projectList.data.forEach(project => {
        const bookmarked = bookmarkProjectId.includes(project.projectId);
        update[project.projectId] = bookmarked;
      })
      setSubscribe(update);
    }

  }

  const handlePageChange = (next) => {
    setCurrentPage(next);
    navi(`?page=${next}`, { state: { from: location } })
  }

  const myprojectFetch = useCallback(() => {
    tryFunc(fetchMyproject, onFetchMyprojectSuccess, onFetchMyprojectErrorHandler)();

  }, [projectList, pageInfo, location.search, currentPage]);

  const subscribeFetch = useCallback((idx) => {
    tryFunc(fetchSubscribe(idx), onFetchSubscribeSuccess, onFetchMyprojectErrorHandler)();
  }, [location.search]);

  const bookmarkFetch = useCallback(() => {
    tryFunc(fetchBookmark, onFetchBookmarkSuccess, onFetchMyprojectErrorHandler)();

  }, [location.search]);

  const fetchBookmark = async () => {
    const res = await getApi(`/bookmark-list?page=${currentPage}`);
    setBookmarkList(res.data);
    return res.data;
  }

  const onFetchBookmarkSuccess = () => {

  }

  const fetchSubscribe = (idx) => {

    const projectId = projectList.data[idx].projectId;

    postApi(`/bookmark/${projectId}`);
    setSubscribe((prevSubscribe) => {
      return {
        ...prevSubscribe,
        [projectId]: !prevSubscribe[projectId],
      }
    });
  }

  const onFetchSubscribeSuccess = () => {
    // console.log("success" + data);
  }

  const onFetchMyprojectSuccess = (data) => {
    setProjectList(data);
    const page = data.pageInfo;
    setPageInfo(page);
    dispatch(setProjectListPageInfo(page));
  }

  const fetchMyproject = async () => {
    const res = await getApi(`/my-projects?page=${currentPage}`)
    return res.data;
  }

  const titleClickHandler = (projectId) => {
    navi(`/projects/${projectId}/tasks`);
  }

  const onFetchMyprojectErrorHandler = {
    500: (err) => {
      console.log("Server Error : ", err);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (err) => {
      console.log(err.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      setIsLoggedIn(false);
      navi(
        `/auth?mode=login$returnUrl=${location.pathname}${location.search}`
      );
    },
    default: (err) => {
      console.error("Unknown Error : ", err);
      alert("프로젝트 목록을 들고 오던 중 오류가 발생했습니다.");
    }
  }
  const renderList = () => {
    if (projectList && projectList.data) {
      return projectList.data.map((post, idx) =>
        <PostItem
          key={post.projectId}
        >
          <BookmarkIcon
            style={bookmarkIcon}
            isBookCheck={!subscribe[post.projectId]}
            onClick={() => subscribeFetch(idx)}
          >
          </BookmarkIcon>
          <ProjectTitle
            onClick={() => titleClickHandler(post.projectId)}
          >
            {post.projectId}
            {post.title}
          </ProjectTitle>
          <ProjectImage src={post.projectImage}>
          </ProjectImage>
          <PostDescription>
            {post.name}
            {post.startDate}
            {post.endDate}
          </PostDescription>
        </PostItem>
      )
    }
  }




  return (
    <>
      <PostListContainer>
        {renderList()}
      </PostListContainer>
      <PaginationContainer>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {page()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === mypage.totalPages}
        >
          Next
        </button>
      </PaginationContainer>
      {isLoading && <Loading />}
    </>
  )
}
