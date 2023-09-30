import React from "react";
import Project from "./Project";
import { useInView } from "react-intersection-observer";
import { getApi } from "../../util/api";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import { setIsLoggedIn } from "../../redux/reducers/loginSlice";

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
`;

const ProjectList = () => {
  const [ref, inView] = useInView();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState("");
  const location = useLocation();
  

  const fetchProjects = async () => {
    const response = await getApi(`/projectlog/admin?page=${page}&size=4`);
    return response.data;
  };

  const onFetchProjectsSuccess = (data) => {
    console.log("프로젝트 무한 스크롤 가져오기 성공 :" + data);
    setProjects([...projects, ...data.data]);
    setPage((prevPage) => prevPage + 1);
    setMaxPage(data.pageInfo.totalPages);
  };

  const onFetchProjectsErrorHandler =  {
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (error) => {
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      setIsLoggedIn(false);
      navigate(
        `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
      );
    },
    default: (error) => {
      console.error("Unknown error:", error);
      alert("프로젝트 목록을 들고 오던 중 오류가 발생하였습니다.");
    },
  }

  const projectFetch = useCallback(() => {
    tryFunc(fetchProjects, onFetchProjectsSuccess, onFetchProjectsErrorHandler)();
  }, [projects, maxPage]);

  useEffect(() => {
    if (inView && page <= maxPage) {
      projectFetch();
    }
  }, [inView, page, maxPage, projectFetch]);

  const navigate = useNavigate();

  const projectLogFetchHandler = useCallback((projectId) => {
    navigate("" + projectId);
  }, []);

  return (
    <StyledProjectList onClick={(e) => e.stopPropagation()}>
      {projects.length > 0 ? (
        projects.map((project) => {
          return (
            <Project
              key={project.projectId}
              data={project}
              onClick={() => {
                setSelectedProject(project.projectId);
                projectLogFetchHandler(project.projectId);
              }}
              isSelected={selectedProject === project.projectId}
            />
          );
        })
      ) : (
        <NoProject>ADMIN인 프로젝트가 존재하지 않습니다.</NoProject>
      )}
      <div ref={ref}></div>
    </StyledProjectList>
  );
};

export default ProjectList;
