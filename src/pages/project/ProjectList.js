import React, { useEffect, useRef, useState } from 'react';
import Project from '../../components/project/Project';
import { getApi } from '../../util/api';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../components/project/Pagination';
import ProjectFilterBar from '../../components/project/ProjectFilterBar';
import ProjectSearchBar from '../../components/project/ProjectSearchBar';
import { tryFunc } from '../../util/tryFunc';

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

  const getProjectList = async () => {
    let url = location.pathname + location.search;
    const data = getApi(url);
    return data;
  };

  const getProjectListSuccess = (data) => {
    projectsHandler(data);
    setLoading(false);
  };

  const getProjectListErrorHandler = {
    500: (error) => {
      console.error('Server Error:', error);
      alert('서버에서 오류가 발생했습니다.');
    },
    404: (error) => {
      console.error('Not Found:', error);
      alert('프로젝트 정보를 찾을 수 없습니다.');
    },
    default: (error) => {
      console.error('Unknown error:', error);
      alert('프로젝트 목록을 가져오는 중 오류가 발생하였습니다.');
    },
  };

  useEffect(() => {
    console.log('useEffect called');
    setLoading(true);
    tryFunc(
      getProjectList,
      getProjectListSuccess,
      getProjectListErrorHandler
    )();
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

  if (loading) return <div>Loading...</div>; // 로딩 메시지

  return (
    <>
      <TopBarContainer>
        <ProjectFilterBar
          onDefault={defaultProjectListHandler}
          onBookmarkFilter={bookmarkFilterHandler}
          onendDateSorting={endDateSortingHandler}
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
          <div>No Projects Found</div>
        )}
      </ProjectGrid>
      <Pagination
        currentPage={Number(page)}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2;
  margin-left: 200px;
  margin-right: 200px;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between; // 좌측과 우측 요소를 양 끝으로 보냅니다.
  align-items: center;
  margin-bottom: 20px;
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 30px;
`;
