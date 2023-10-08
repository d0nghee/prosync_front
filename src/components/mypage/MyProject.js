import React, { useEffect, useRef, useState } from 'react'
import { getApi, postApi } from '../../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setProjectListPageInfo } from '../../redux/reducers/member/mypageSlice';
import { PostItem, Container, PageButton, PaginationContainer, PostTitle, PostListContainer, ProjectTitle, PostDescription, ProjectImage, BookmarkWrapper, PostName, PostsDate } from '../../css/MyPageStyle';
import BookmarkIcon from './BookmarkIcon';
import { tryFunc } from '../../util/tryFunc';
import { setIsLoggedIn } from '../../redux/reducers/member/loginSlice';
import Loading from '../common/Loading';
import styled from 'styled-components';
import ProjectSearchBar from '../project/ProjectSearchBar';

const bookmarkIcon = {
  marginRight: "10px",
  cursor: "pointer",
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;


export default function MyProject(props) {

  const dispatch = useDispatch();
  const navi = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectElement, setProjectElement] = useState([]);
  const [buttons, setButtons] = useState();
  const [maxPage, setMaxPage] = useState();
  const [bookmark, setBookmark] = useState({});
  const [use, setUse] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const currentFilter = useRef({
    type : '',
    query : '',
  })


  const handleImage = (e, projectId) => {
    e.stopPropagation();
    titleClickHandler(projectId);
  }


  const handlePageChange = (next) => {
    setCurrentPage(next);
    navi(`?page=${next}`, { state: { from: location } })
  }

  const fetchSubscribe = async (projectId) => {
    console.log("성공")
    await postApi(`/bookmark/${projectId}`);
    setUse(!use);
    setIsLoading(false);
  }

  const onFetchMyprojectSuccess = async (data) => {

    const resProject = data.project;
    const update = data.update;

    setMaxPage(resProject.pageInfo.totalPages);

    let buttons = [];

    const items = resProject.data.map((post) => {
      return (
        <PostItem
          key={post.projectId}
        >
          <BookmarkWrapper>
            <BookmarkIcon
              style={bookmarkIcon}
              onClick={() => fetchSubscribe(post.projectId)}
              isBookCheck={!update[post.projectId]}
            >
            </BookmarkIcon>
            <ProjectTitle
              onClick={() => titleClickHandler(post.projectId)}
            >
              {post.title}
            </ProjectTitle>
          </BookmarkWrapper>
          <ProjectImage
            src={post.projectImage}
            onClick={handleImage}>
          </ProjectImage>
          <PostDescription>
            <PostName>
              {post.name}
            </PostName>
          </PostDescription>
          <PostDescription>

            <PostsDate>
              {post.startDate} to {post.endDate}
            </PostsDate>

          </PostDescription>
        </PostItem>
      )
    })

    for (let i = 1; i <= resProject.pageInfo.totalPages; i++) {
      buttons.push(
        <>
          <PageButton
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={i === currentPage}
          >
            {i}
          </PageButton>
        </>
      )
    }
    setProjectElement(items);
    setButtons(buttons);


  }

  const fetchMyproject = async () => {
    let url = `/my-projects` + location.search;
    console.log("url", url)
    const searchData = getApi(url);
    console.log("서치", searchData.data);
    const res = await getApi(`/my-projects?page=${currentPage}`)
    const bookmarkRes = await getApi(`/bookmark-list?page=${currentPage}`);

    // dispatch(setIsBookCheck(bookmarkRes.data.data));
    let res2 = [];

    try {
      for (let i = 1; i <= bookmarkRes.data.pageInfo.totalPages; i++) {
        const bookmarkPage = getApi(`/bookmark-list?page=${i}`);
        // res2 = bookmarkRes.data.data.map(book => book);
        res2 = [...res2, ...(await bookmarkPage).data.data];
      }

      const bookmarkProjectId = res2.map(book => book.projectId);
      const update = {};

      res.data.data.forEach(project => {
        const bookmarked = bookmarkProjectId.includes(project.projectId);
        update[project.projectId] = bookmarked;
      });

      setBookmark(update);
      dispatch(setProjectListPageInfo(res.data.pageInfo));

      setIsLoading(false);

      return {
        project: res.data,
        bookmark: res2,
        update: update,
      }
    } catch (err) {
      return {
        project: res.data,
        bookmark: [],
        update: {},
      }
    }

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

  const searchHandler = (query) => {
    console.log('search');
    let url = QueryParamHandler(1, query);
    navi(url);
    currentFilter.current = { ...currentFilter.current, query}
  }

  const QueryParamHandler = (page, query) => {
    let newUrl = `/user/myproject?page=${page}`;
    if (query) {
      newUrl += `$search=?${query}`;
    }
    return newUrl;
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
    setIsLoading(true);
    tryFunc(fetchMyproject, onFetchMyprojectSuccess, onFetchMyprojectErrorHandler)();
  }, [currentPage, dispatch, use, location.search]);


  return (
    <>
      {isLoading && <Loading />}
        <ProjectSearchBar onSearch={searchHandler}>
        </ProjectSearchBar>
      <PostListContainer>
        {projectElement}
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
          disabled={currentPage === maxPage}
        >
          Next
        </button>
      </PaginationContainer>
    </>
  )
}



