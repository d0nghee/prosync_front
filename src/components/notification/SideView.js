import React from "react";
import ProjectList from "./ProjectList";
import { styled } from "styled-components";

const Container = styled.div`
  margin-left: 5%;
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 50rem;
  max-height: 100%;
  min-height: 20rem;
  border: 1px solid gray;
  border-radius: 20px;
  padding: 0% 1% 0% 1%;
`;


const SideView = () => {
  return (
    <Container>
      <ProjectList />
    </Container>
  );
};

export default SideView;
