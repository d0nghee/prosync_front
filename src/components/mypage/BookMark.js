import React, { useEffect, useState } from 'react'
import { getApi } from '../../util/api'
import { useDispatch } from 'react-redux';
import { Container, BookmarkListItem, PaginationContainer, PageButton, ProjectTitle, PostDate, ListItemContainer, PostListContainer, PostItem, ProjectImage, NullPost, BookmarkWrapper, PostDescription, PostName, PostsDate, ProjectContent, PaginationGridContainer } from '../../css/MyPageStyle'
import PaginationButton from './PaginationButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import styled from 'styled-components';
import MyPageProjectProject from './MyPageProjectProject';
import NoContent from '../../assets/icon/mypage.icon6.png'


export default function BookMark(props) {

  const location = useLocation();
  const dispatch = useDispatch();
  const navi = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [book, setBook] = useState(false);
  const [bookMarkList, setBookMarkList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [pageInfo, setPageInfo] = useState();
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get("page") || 1;


  useEffect(() => {
    tryFunc(fetchBookmarkList, onFetchBookmarklistSuccess, dispatch)();
  }, [location.search, location.pathname, book]);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const nextPage = parseInt(pageParam);
      setCurrentPage(nextPage);
    }
  }, [location.search])

  const handlePageChange = (nextPage) => {
    let url = QueryParamHandler(nextPage);
    navi(url);
  };

  const QueryParamHandler = (page) => {
    let newUrl = `/user/bookmark?page=${page}`
    return newUrl;
  }

  const fetchBookmarkList = async () => {
    const res = getApi(`/bookmark-list?page=${page}`);
    return res;
  }

  const onFetchBookmarklistSuccess = (data) => {
    bookmarkHandler(data);
  }

  const bookmarkHandler = (data) => {
    setBookMarkList(data.data.data);
    setTotalPages(data.data.pageInfo.totalPages);
    setPageInfo(data.data.pageInfo.totalElements)
  }

  const bookmarkChangeHandler = () => {
    setBook((prev) => {
      return !prev;
    })
  }

  return (
    <>
      <Noti>
        북마크된 프로젝트의 갯수는 {pageInfo}개 입니다.
      </Noti>
      {
        <>
          <ProjectContent>
            {
              bookMarkList && bookMarkList.length > 0 ? (
                bookMarkList.map((post) => (
                  <PostItem
                    key={post.projectId}
                  >
                    <MyPageProjectProject
                      projects={post}
                      onBookmarkChange={bookmarkChangeHandler}
                    />
                  </PostItem>
                ))) : (
                  <NullPost>
                    <NoContentImg src={NoContent}/>
                    <NoContentComment>
                      북마크된 프로젝트가 없습니다.
                    </NoContentComment>
                  </NullPost>
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
                currentPage={Number(currentPage)}
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

const Noti = styled.div`
  font-size: 23px;
  margin-left: 400px;
  margin-right: 100px;
  margin-top: 50px;
  grid-column: 1/7;
`

const NoContentImg = styled.img`
  grid-column: 1/10;
  margin-left: 300px;
`

const NoContentComment = styled.div`
  font-size: 20px;
  margin-left: 200px;
  grid-column: 1/10;
`