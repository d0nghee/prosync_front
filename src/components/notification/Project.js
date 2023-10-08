import React from "react";
import { styled } from "styled-components";

const ProjectContainer = styled.div`
  height: 10rem;
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  border: ${(props) => (props.isSelected ? null : "1px solid gray")};
  padding: 1%;
  border-radius: 10px;


  background-color: ${(props) => (props.isSelected ? "#b2b3c7" : null)};
  font-weight: ${(props) => (props.isSelected ? "bold" : null)};
  color: ${(props) => (props.isSelected ? "white" : null)};

  &:hover {
    background-color: #f7efed;
    transform: scale(1.03);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    color: black;
    font-weight: 900;
  }

  & > img {
    width: 25%;
    height: 70%;
    object-fit: fill;
  }

  & > div:nth-child(2) {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: x-large;
    margin-left: 1.1%;
    text-align: center;
  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    font-size:smaller;
    font-weight: 700;
  }

  & > div:nth-child(3) > * {
    margin-bottom: 6%;
  }


`;

const Project = ({ data, onClick, isSelected }) => {
  const { title, projectImage, startDate, endDate } = data;

  return (
    <ProjectContainer onClick={onClick} isSelected={isSelected}>
      <img src={projectImage}></img>
      <div>{title}</div>
      <div>
        <div>프로젝트 기간</div>
        <div>{startDate} -</div>
        <div>{endDate}</div>
      </div>
    </ProjectContainer>
  );
};

export default Project;
