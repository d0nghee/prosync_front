import React from "react";
import styled from "styled-components";
import Log from "./Log";
import LogTitle from "./LogTitle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5%;
  min-height: 20rem;
  

  & > * {
    margin-bottom: 3%;
  }
`;

const NoData = styled.div`
  text-align: center;
`;

const ProjectLogList = ({ logList }) => {
  return (
    <Container>
      <LogTitle />
      {logList.length > 0 &&
        logList.map((log) => <Log key={log.logId} log={log} />)}
      {logList.length === 0 && (
        <NoData>
          <h2>알림이 존재하지 않습니다!</h2>
        </NoData>
      )}
    </Container>
  );
};

export default ProjectLogList;
