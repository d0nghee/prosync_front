import React from "react";
import styled from "styled-components";
import Log from "./Log";
import LogTitle from "./LogTitle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5%;
  min-height: 30rem;

  & > * {
    margin-bottom: 3%;
  }
`;



const ProjectLogList = ({ logList }) => {
  return (
    <Container>
      <LogTitle />
      {logList.map((log) => (
        <Log key={log.logId} log={log} />
      ))}
    </Container>
  );
};

export default ProjectLogList;
