import React from "react";
import { styled } from "styled-components";
import { Container } from "../components/task/form/TaskForm.style";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #555;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;

  & > h1 {
    color: white;
  }
`;

const LoadingIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: #fff;
  border-left-color: #fff;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <h1>Loading...</h1>
      <LoadingIcon />
    </LoadingContainer>
  );
};

export default LoadingScreen;
