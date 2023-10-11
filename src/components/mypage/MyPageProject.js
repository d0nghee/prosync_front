import React, { useEffect, useRef, useState } from 'react'
import { getApi, postApi } from '../../util/api'
import { useNavigate, useLocation } from 'react-router-dom'
import { PostItem, Container, PageButton, PaginationContainer, PostTitle, ProjectTitle, PostDescription, ProjectImage, BookmarkWrapper, PostName, PostsDate, NullPost, ProjectSearchBarContainer, ProjectContent, FilterContainer, PaginationGridContainer } from '../../css/MyPageStyle';
import { tryFunc } from '../../util/tryFunc';
import { setIsLoggedIn } from '../../redux/reducers/member/loginSlice';
import Loading from '../common/Loading';

import ProjectSearchBar from '../project/ProjectSearchBar';
import PaginationButton from './PaginationButton';
import ProjectFilterBar from '../project/ProjectFilterBar';
import MyPageProjectProject from './MyPageProjectProject';
import { useDispatch } from 'react-redux';



export default function MyProject() {
  const navi = useNavigate();
  const dispatch = useDispatch();
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
    let url = location.pathname + location.search;
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
      dispatch)();
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

  const defaultProjectListHandler = () => {
    navi(`/user/myprojects?page=1`);
    currentFilter.current = { bookmark: false, type: '', query: '' }
  };

  const bookmarkFilterHandler = () => {
    navi(`/user/myprojects?bookmark=true&page1`);
    currentFilter.current = { bookmark: true, type: '', query: '' }
  }

  const endDateHandler = () => {
    navi(`/user/myprojects?sort=endDate&page=1`);
  }

  const searchHandler = (query) => {
    console.log('search');
    let url = QueryParamHandler(1, query);
    navi(url);
    currentFilter.current = { ...currentFilter.current, query }
  }

  const QueryParamHandler = (page, query) => {
    let newUrl = `/user/myprojects?page=${page}`;

    if (currentFilter.current.type === 'endDate') {
      newUrl += '&sort=endDate'
    }
    if (currentFilter.current.bookmark) {
      newUrl += '&bookmark=true'
    }
    if (query) {
      newUrl += `&search=${query}`;
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
      <ProjectSearchBarContainer>
        <ProjectSearchBar
          onSearch={searchHandler}
          padding="0px"
          margin="0px 20px 0px 0px"
        >
        </ProjectSearchBar>
      </ProjectSearchBarContainer>
      <FilterContainer>
        <ProjectFilterBar
          onDefault={defaultProjectListHandler}
          onBookmarkFilter={bookmarkFilterHandler}
          onendDateSorting={endDateHandler}
        />
      </FilterContainer>

      {
        <>
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
      }
    </>
  )
}