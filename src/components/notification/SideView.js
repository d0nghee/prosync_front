import React from "react";
import ProjectList from "./ProjectList";
import { styled } from "styled-components";

const Container = styled.div`
  margin-left: 12%;
  width: 20%;
  display: flex;
  flex-direction: column;
  height: 40rem;
  max-height: 100%;
`;

const Title = styled.div`
    margin-bottom: 5%;
    font-size: larger;
    font-weight: 900;
    text-align: center;
`;

const SideView = () => {
  return (
    <Container>
      <Title>ADMIN 프로젝트 목록</Title>
      <ProjectList />
    </Container>
  );
};

export default SideView;
