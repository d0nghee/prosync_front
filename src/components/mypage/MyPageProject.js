import React, { useEffect, useRef, useState } from 'react'
import { getApi, postApi } from '../../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setProjectListPageInfo } from '../../redux/reducers/member/mypageSlice';
import { PostItem, Container, PageButton, PaginationContainer, PostTitle, PostListContainer, ProjectTitle, PostDescription, ProjectImage, BookmarkWrapper, PostName, PostsDate, NullPost, ProjectSearchBarContainer, ProjectContent, FilterContainer, PaginationGridContainer } from '../../css/MyPageStyle';
import BookmarkIcon from './BookmarkIcon';
import { tryFunc } from '../../util/tryFunc';
import { setIsLoggedIn } from '../../redux/reducers/member/loginSlice';
import Loading from '../common/Loading';

import ProjectSearchBar from '../project/ProjectSearchBar';
import PaginationButton from './PaginationButton';
import ProjectFilterBar from '../project/ProjectFilterBar';
import MyPageProjectProject from './MyPageProjectProject';





export default function MyProject() {
  const navi = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectElement, setProjectElement] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [book, setBook] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const currentFilter = useRef({
    type: '',
    query: '',
    bookmark: false,
  });

  const fetchMyproject = async () => {
    let url = `/my-projects` + location.search;
    const res = getApi(url);
    return res;
  }

  const onFetchMyprojectSuccess = (data) => {
    console.log("데이터", data)
    myprojectHandler(data);
    setIsLoading(false);
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
    tryFunc(
      fetchMyproject,
      onFetchMyprojectSuccess,
      onFetchMyprojectErrorHandler)();
  }, [currentPage, location.search, location.pathname, book]);


  const myprojectHandler = (data) => {
    console.log("데이터", data)
    setProjectElement(data.data.data);
    setTotalPages(data.data.pageInfo.totalPages);
  }


  const handlePageChange = (next) => {
    let url = QueryParamHandler(next);
    navi(url);
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

  const defaultProjectListHandler = () => {
    navi(`/my-projects?page=1`);
    currentFilter.current = { bookmark: false, type: '', query: '' }
  };

  const bookmarkFilterHandler = () => {
    navi(`/my-projects?bookmark=true&page1`);
    currentFilter.current = { bookmark: true, type: '', query: '' }
  }

  const endDateHandler = () => {
    navi(`/my-projects?sort=endDate&page=1`);
  }

  const searchHandler = (query) => {
    console.log('search');
    let url = QueryParamHandler(1, query);
    navi(url);
    currentFilter.current = { ...currentFilter.current, query }
  }

  const QueryParamHandler = (page, query) => {
    let newUrl = `/user/my-projects?page=${page}`;

    if (currentFilter.current.type === 'endDate') {
      newUrl += '&sort=endDate'
    }
    if (currentFilter.current.bookmark) {
      newUrl += '&bookmark=true'
    }
    if (query) {
      newUrl += `$search=?${query}`;
    } 
    else if (currentFilter.current.query) {
      newUrl += `&search=${currentFilter.current.query}`
    }
    return newUrl;
  }

  const bookmarkChangeHandler = () => {
    setBook((prev) => {
      return !prev;
    })
  }



  return (
    <>
      {isLoading && <Loading />}
      {projectElement.length === 0 ? (
        <>
          <NullPost>내가 속한 프로젝트가 없습니다.</NullPost>
        </>
      ) : (
        <>
          <ProjectSearchBarContainer>
            <ProjectSearchBar onSearch={searchHandler}>
            </ProjectSearchBar>
          </ProjectSearchBarContainer>
          <FilterContainer>
            <ProjectFilterBar
              onDefault={defaultProjectListHandler}
              onBookmarkFilter={bookmarkFilterHandler}
              onendDateSorting={endDateHandler}
            />
          </FilterContainer>

          <ProjectContent>
            {
              projectElement && projectElement.length > 0 ? (
                projectElement.map((post) => (
                  <PostItem
                    key={post.projectId}
                  >
                    <MyPageProjectProject 
                      projects={post}
                      onBookmarkChange={bookmarkChangeHandler}
                    />
                  </PostItem>
                ))) : (
                <NullPost>내가 속한 프로젝트가 없습니다.</NullPost>
              )
            }

          </ProjectContent>
          <PaginationGridContainer>
            <PaginationContainer>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <PaginationButton
                currentPage={Number(page)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </PaginationContainer>
          </PaginationGridContainer>
        </>
      )}

    </>
  )
}



