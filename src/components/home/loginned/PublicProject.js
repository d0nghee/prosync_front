import React from "react";
import { styled } from "styled-components";
import bookmark_off from "../../../assets/images/bookmark-off.png";
import bookmark_on from "../../../assets/images/bookmark-on.png";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(#320d12);
  cursor: pointer;
  font-weight: 900;
  border-radius: 25px;
  box-shadow: 1px 1px 2px 2px white;
  background-color: rgb(217,217,217);
  max-height: 22rem;
  padding: 3% 2% 3% 2%;


  &:hover {
    box-shadow: 2px 2px 3px 4px #003350;
    background-color: #5cbaff;
    color: white;
  }

  & > .project-upper {
    display: flex;
    height: 20%;
    justify-content: space-between;
    padding: 2% 4%;
    align-items: center;

    & > *:nth-child(1) {
      font-size: 1.3rem;
    }

    & > img {
      object-fit: fill;
      width: 10%;
      height: 70%;
    }
  }

  & > img {
    align-self: center;
    object-fit: contain;
    width: 75%;
    height: 50%;
  }

  & > .project-detail {
    display: flex;
    width: 100%;
    height: 30%;
    align-items: center;
    padding: 1% 4%;

    & > img {
      object-fit: fill;
      width: 15%;
      height: 60%;
      border-radius: 50%;
      border: 2px solid gray;
    }

    & > .project-manager {
      margin-left: 2%;
      width: 30%;
    }

    & > .project-period {
      width: 50%;
      text-align: center;
    }
  }
`;
const PublicProject = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/projects/${project.projectId}`);
      }}
    >
      <div className="project-upper">
        <div>{project.title}</div>
        {project.bookmarkId ? (
          <img src={bookmark_on} />
        ) : (
          <img src={bookmark_off} />
        )}
      </div>
      <img src={project.projectImage} />
      <div className="project-detail">
        <img src={project.profileImage} />
        <div className="project-manager">
          <div>담당자</div>
          <div>{project.name}</div>
        </div>
        <div className="project-period">
          <div>프로젝트 기간</div>
          <div>시작날짜: {project.startDate}</div>
          <div>종료날짜: {project.endDate}</div>
        </div>
      </div>
    </Container>
  );
};

export default PublicProject;
