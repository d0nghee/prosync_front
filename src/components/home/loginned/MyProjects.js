import React from "react";
import { styled } from "styled-components";
import MyProjectsList from "./MyProjectsList";
import { useNavigate } from "react-router-dom";

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
      color: rgb(158, 105, 194);
    }

    & > .create-button {
      background-color: rgb(138, 128, 191);
      width: 27%;
      border-radius: 30px;
      color: white;
      font-size: 1.2rem;
      text-align: center;
      padding: 1% 1% 0% 1%;
      font-weight: 900;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        color: white;
        box-shadow: 500px 0 0 0 rgba(0, 0, 0, 0.25) inset,
          -500px 0 0 0 rgba(0, 0, 0, 0.25) inset;
      }
    }
  }

  & > .more-button {
    background-color: gray;
    color: white;
    width: 7%;
    padding-bottom: 1%;
    text-align: center;
    border-radius: 10px;
    padding-top: 0.7%;
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

const MyProjects = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="upper">
        <div className="title">내 프로젝트</div>
        <div
          className="create-button"
          onClick={() => {
            navigate("/projects/new");
          }}
        >
          프로젝트 생성
        </div>
      </div>
      <div
        className="more-button"
        onClick={() => {
          navigate("/user/myprojects");
        }}
      >{`더보기 >`}</div>
      <MyProjectsList />
    </Container>
  );
};

export default MyProjects;
