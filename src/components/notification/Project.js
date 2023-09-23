import React from "react";
import { styled } from "styled-components";

const ProjectContainer = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  transition: all 0.3s;


  background-color: ${props => props.isSelected? 'black' : null};
  border:  ${props => props.isSelected? '2px solid #3498db' : null};
  box-shadow:  ${props => props.isSelected? '0px 0px 15px rgba(52, 152, 219, 0.5)' : null};
  font-weight:  ${props => props.isSelected? 'bold' : null};
  color:  ${props => props.isSelected? 'white' : null};

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }

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

const Project = ({ data, onClick, isSelected }) => {
  const { projectId, title, projectImage } = data;

  

  return (
    <ProjectContainer onClick={onClick} isSelected={isSelected}>
      <img src={projectImage}></img>
      <div>{title}</div>
      <div>{projectId}</div>
    </ProjectContainer>
  );
};

export default Project;
