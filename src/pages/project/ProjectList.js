import React, { useEffect, useRef, useState } from 'react';
import Project from '../../components/project/Project';
import { getApi } from '../../util/api';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../components/project/Pagination';
import ProjectFilterBar from '../../components/project/ProjectFilterBar';
import ProjectSearchBar from '../../components/project/ProjectSearchBar';
import { tryFunc } from '../../util/tryFunc';
import { useDispatch } from 'react-redux';
import NoContent from '../../components/project/NoContent';

import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();
  const currentFilter = useRef({
    type: '', // 'endDate', 'latest'
    query: '', // 검색 쿼리
    bookmark: false, // 북마크 여부
  });
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState(false);
  const dispatch = useDispatch();
  const [currentMenu, setCurrentMenu] = useState('최신 순');
  const bodyComment = '일치하는 프로젝트가 없습니다';

  const getProjectList = async () => {
    let url = location.pathname + location.search;
    const data = getApi(url);
    return data;
  };

  const getProjectListSuccess = (data) => {
    projectsHandler(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log('useEffect called');
    setLoading(true);
    tryFunc(getProjectList, getProjectListSuccess, dispatch)();
  }, [location.pathname, location.search]);

  // 필터에 맞는 프로젝트 데이터 세팅
  const projectsHandler = (response) => {
    setProjects(response.data.data);
    setTotalPages(response.data.pageInfo.totalPages);
  };

  // 필터에 맞는 프로젝트 데이터리스트 페이지 이동 시 naviate
  const handlePageChange = (newPage) => {
    let url = QueryParamHandler(newPage);
    setLoading(true);
    navigate(url);
  };

  // 기본 정렬
  const defaultProjectListHandler = () => {
    navigate(`/projects?page=1`);
    currentFilter.current = { bookmark: false, type: '', query: '' };
  };

  // 북마크 필터
  const bookmarkFilterHandler = () => {
    console.log('bookmark');

    navigate(`/projects?bookmark=true&page=1`);
    currentFilter.current = { bookmark: true, type: '', query: '' };
  };

  // 종료 임박 순
  const endDateSortingHandler = () => {
    navigate(`/projects?sort=endDate&page=1`);
    currentFilter.current = { bookmark: false, type: 'endDate', query: '' };
  };

  // 검색 필터
  const ProjectSerachHandler = (query) => {
    let url = QueryParamHandler(1, query);
    navigate(url);
    currentFilter.current = { ...currentFilter.current, query };
  };

  // 쿼리 파라미터 조작 핸들러
  const QueryParamHandler = (page, query) => {
    console.log('QueryParamHandler');
    let newUrl = `/projects?page=${page}`;

    if (currentFilter.current.type === 'endDate') newUrl += '&sort=endDate';
    if (currentFilter.current.bookmark) newUrl += '&bookmark=true';
    if (query) newUrl += `&search=${query}`;
    else if (currentFilter.current.query)
      newUrl += `&search=${currentFilter.query}`;

    return newUrl;
  };

  const starChangeHandler = () => {
    setStar((pre) => {
      console.log(pre);
      return !pre;
    });
  };

  if (loading) return <LoadingSpinner />; // 로딩 메시지

  return (
    <Container>
      <TopBarContainer>
        <ProjectFilterBar
          onDefault={defaultProjectListHandler}
          onBookmarkFilter={bookmarkFilterHandler}
          onendDateSorting={endDateSortingHandler}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
        <ProjectSearchBar onSearch={ProjectSerachHandler} />
      </TopBarContainer>
      <ProjectGrid>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Project
              key={project.projectId}
              projects={project}
              onStarChange={starChangeHandler}
            />
          ))
        ) : (
          <NoItemContainer>
            <NoContent body={bodyComment} />
          </NoItemContainer>
        )}
      </ProjectGrid>
      <PaginationWrapper>
        <Pagination
          currentPage={Number(page)}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </Container>
  );
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 20px;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽으로 붙임
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 20px;
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 30px;
`;

const PaginationWrapper = styled.div`
  margin-top: 50px;
`;

const NoItemContainer = styled.div`
  grid-column: 1 / -1; // 전체 컬럼을 차지
  grid-row: 1 / -1; // 전체 행을 차지
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Container = styled.div`
  height: 850px;
`;
