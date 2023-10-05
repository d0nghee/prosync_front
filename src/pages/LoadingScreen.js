import React from "react";
import { styled } from "styled-components";
import { Container } from "../components/task/form/TaskForm.style";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
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
