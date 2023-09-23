import React from "react";
import { useCallback } from "react";
import { styled } from "styled-components";
import { getApi } from "../../util/api";

const ProjectContainer = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid black;

  & > img {
    width: 5rem;
    height: 5rem;
    object-fit: fill;
  }

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: larger;
    margin-left: 1.1%;
  }
`;

const Project = ({ data }) => {
  const { projectId, title, projectImage } = data;

  const projectLogFetchHandler = useCallback(() => {
    getApi(`/projectlog/${projectId}`)
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProjectContainer onClick={projectLogFetchHandler}>
      <img src={projectImage}></img>
      <div>{title}</div>
      <div>{projectId}</div>
    </ProjectContainer>
  );
};

export default Project;
