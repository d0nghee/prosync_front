import React from "react";
import { styled } from "styled-components";
import { getApi } from "../../../util/api";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tryFunc } from "./../../../util/tryFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PublicProject from "./PublicProject";
import ListLoadingSpinner from "../../common/ListLoadingSpinner";
import { useDispatch } from "react-redux";


const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20%;

  & > .loading-spinner {
    width: 100%;
    height: 100%;
    margin-bottom: 6%;
  }

  & > .no-project {
    font-weight: 900;
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    min-height: 30rem;
    padding-top: 15%;
  }

  & > .left-direction {
    margin-right: 2%;
    color: ${props=> props.isNone ? 'null' : props.startPage ? '#e0dded':'#267eff'};
    cursor: ${props=> props.isNone ? 'null' :props.startPage ? 'null':'pointer'};
  }

  & > .left-direction:hover {
    color: ${props=> props.isNone ? 'null' :props.startPage ? 'null':'#002967'};

  }

  & > .right-direction {
    margin-left: 2%;
    color: ${props=>props.isNone ? 'null' : props.endPage ? '#e0dded':'#267eff'};
    cursor: ${props=> props.isNone ? 'null' :props.endPage ? 'null':'pointer'};
  }

  & > .right-direction:hover {
    color: ${props=>props.isNone ? 'null' : props.endPage ? 'null':'#002967'};
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 2rem;
  column-gap: 1rem;
  width: 100%;
  height: 100%;
`;

const PublicProjectsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const handleNext = () => {
    if (page < maxPage) {
        setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const fetchPublicProjectList = async () => {
    const response = await getApi(`/projects?page=${page}&size=6`);
    return response.data;
  };

  const fetchPublicProjectListSuccess = (data) => {
    setProjectsList(data.data);
    setMaxPage(data.pageInfo.totalPages);
    setIsLoading(false);
    console.log("fetch :");
    console.log(data);
  };



  useEffect(() => {
    setIsLoading(true);
    tryFunc(
      fetchPublicProjectList,
      fetchPublicProjectListSuccess,
      dispatch
    )();
  }, [page, maxPage]);

  return (
    <Container startPage={page===1} endPage={page===maxPage} isNone={projectsList.length==0}>
      {isLoading ? (
        <div className="loading-spinner">
        <ListLoadingSpinner />
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            className="left-direction"
            icon={faAngleLeft}
            size="5x"
            onClick={handlePrev}
          />
          {
             projectsList.length > 0 ? <ListContainer>{
              projectsList.map((project) => (
              <PublicProject key={project.projectId} project={project} />
            ))}
            </ListContainer>
            : <div className="no-project">현재 운영중인 프로젝트가 존재하지 않습니다</div>
          }
         
          <FontAwesomeIcon
            className="right-direction"
            icon={faAngleRight}
            size="5x"
            onClick={handleNext}
          />
        </>
      )}
    </Container>
  );
};

export default PublicProjectsList;

