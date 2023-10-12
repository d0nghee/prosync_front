import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import PublicProjectsList from './PublicProjectsList';

const Container = styled.div`
  max-height: 80rem;
  width: 75%;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 5%;
  }

  & > .upper {
    display: flex;
    justify-content: space-between;
    margin-top: 10%;

    & > .title {
      font-size: 3rem;
      font-weight: 900;
      color: black;
    }
    

  }

  & > .more-button {
    background-color: rgb(217,217,217);
    color:black;
    width: 7%;
    padding-bottom: 1%;
    text-align: center;
    border-radius: 10px;
    padding-top: 0.6%;
    align-self: end;
    cursor: pointer;
    transition: all 0.5s;
    font-weight: 800;

    &:hover {
        color: white;
        box-shadow: 150px 0 0 0 rgba(0, 0, 0, 0.25) inset,
          -150px 0 0 0 rgba(0, 0, 0, 0.25) inset;
      }
  }

 
`;

const PublicProjects = () => {

  const navigate = useNavigate();

  return (
    <Container>
      <div className="upper">
        <div className="title">모든 프로젝트</div>
      </div>
      <div className="more-button" onClick={() => {navigate('/projects')}}>{`더보기 >`}</div>
      <PublicProjectsList/>
    </Container>
  );
};

export default PublicProjects;