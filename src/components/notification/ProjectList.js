import React from 'react'
import Project from './Project';
import { useInView } from 'react-intersection-observer';
import { getApi } from '../../util/api';
import { useState, useEffect, useCallback } from 'react';
import  styled  from 'styled-components';

const StyledProjectList = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  box-shadow: 5px 5px 5px;
  padding-bottom: 2%;

  & > *:not(:nth-last-child(1)):not(:nth-last-child(2)) {
    margin-bottom: 1rem;
  }
`;

const ProjectList = () => {

  const [ref, inView] = useInView();
  const [projects, setProjects] = useState([]);
  const [page,setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const projectFetch = useCallback(() => {
    getApi(`/projectlog/admin?page=${page}&size=4`)
    .then((res) => {
      console.log(res);
      setProjects([...projects, ...(res.data.data)])
      setPage((prevPage) => prevPage + 1)
      setMaxPage(res.data.pageInfo.totalPages);
    })
    .catch((err) => {console.log(err)});
  },[projects,maxPage]);

  useEffect(() => {
    if (inView && page<=maxPage) {
      projectFetch();
    }
  },[inView,page,maxPage,projectFetch]);

  return (
    <StyledProjectList>
    { projects.length>0 ? projects.map((project)=> {return <Project data={project}/>
      }) : <div>ADMIN인 프로젝트가 존재하지 않습니다.</div>
    }
    <div ref={ref}></div>
    </StyledProjectList>
  )
}

export default ProjectList;
