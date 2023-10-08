import React from "react";
import Project from "./Project";
import { useInView } from "react-intersection-observer";
import { getApi } from "../../util/api";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const StyledProjectList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 2% 2% 2% 2%;
  

  & > *:not(:nth-last-child(1)):not(:nth-last-child(2)) {
    margin-bottom: 1rem;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f7f7f7;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const NoProject = styled.div`
  margin-top: 70%;
  text-align: center;

  & > div {
    font-size: 1.5rem;
    padding-top: 3%;
    font-weight: 900;
  }
`;

const ProjectCount = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 5% 0;
`;

const ProjectList = () => {
  const [ref, inView] = useInView();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState("");
  const location = useLocation();
  const [projectCount, setProjectCount] = useState(0);

  const fetchProjects = async () => {
    const response = await getApi(`/projectlog/admin?page=${page}&size=6`);
    return response.data;
  };

  const onFetchProjectsSuccess = (data) => {
    console.log("프로젝트 무한 스크롤 가져오기 성공 :");
    console.log(data);
    setProjects([...projects, ...data.data]);
    setPage((prevPage) => prevPage + 1);
    setMaxPage(data.pageInfo.totalPages);
    setProjectCount(data.pageInfo.totalElements);
  };

  const onFetchProjectsErrorHandler = {
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
  };

  const projectFetch = useCallback(() => {
    tryFunc(
      fetchProjects,
      onFetchProjectsSuccess,
      onFetchProjectsErrorHandler
    )();
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
    <>
      <ProjectCount>{`${projectCount} 개의 프로젝트가 존재합니다`}</ProjectCount>
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
          <NoProject>
            <FontAwesomeIcon icon={faCircleXmark} size="5x" />
            <div>No Projects</div>
          </NoProject>
        )}
        <div ref={ref}></div>
      </StyledProjectList>
    </>
  );
};

export default ProjectList;
