import React from 'react'
import Project from './Project';
import { useInView } from 'react-intersection-observer';
import { getApi } from '../../util/api';
import { useState, useEffect, useCallback } from 'react';
import  styled  from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledProjectList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 2%;
  border: 2px solid gray;
  border-radius: 10px;

  & > *:not(:nth-last-child(1)):not(:nth-last-child(2)) {
    margin-bottom: 1rem;
  }
`;


const NoProject = styled.div`
  margin-top: 70%;
  font-size: larger;
  font-weight: 900;
  text-align: center;
`

const ProjectList = () => {

  const [ref, inView] = useInView();
  const [projects, setProjects] = useState([]);
  const [page,setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState('');

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

  const navigate = useNavigate();

  const projectLogFetchHandler = useCallback((projectId) => {

    navigate("" + projectId);
  }, []);

 

  return (
    <StyledProjectList onClick={(e) => e.stopPropagation()}>
    { projects.length>0 ? projects.map((project)=> {return <Project key={project.projectId} data={project} onClick={() => {setSelectedProject(project.projectId);  projectLogFetchHandler(project.projectId)}} isSelected={selectedProject === project.projectId}/>
      }) : <NoProject>ADMIN인 프로젝트가 존재하지 않습니다.</NoProject>
    }
    <div ref={ref}></div>
    </StyledProjectList>
  )
}

export default ProjectList;
