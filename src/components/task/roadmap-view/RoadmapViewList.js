import React, { useEffect, useRef } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Guidance from "../../common/Guidance";
import ListLoadingSpinner from "../../common/ListLoadingSpinner";

export default function RoadmapViewList() {
  const timelineRef = useRef(); // 하나의 Timeline에 대한 ref를 저장할 변수
  const tasks = useSelector((state) => state.taskList.list);
  const taskStatusList = useSelector((state) => state.taskStatus.list);
  const pageInfo = useSelector((state) => state.taskList.pageInfo);

  useEffect(() => {
    if (tasks.length !== 0) {
      // 모든 tasks를 하나의 타임라인에 추가
      const timelineData = tasks.map((task) => {
        if (task)
          return {
            id: task.taskId,
            content: task.title,
            start: task.startDate,
            end: task.endDate,
            style: `background-color: ${task.color}; color: #fff; border-radius: 4px;`,
          };
      });

      const items = new DataSet(timelineData);

      const options = {
        zoomMin: 1000 * 60 * 60 * 24, // 최소 줌 1일
        zoomMax: 1000 * 60 * 60 * 24 * 30,
        height: "500px",
      };

      new Timeline(timelineRef.current, items, null, options);
    }
  }, [tasks, taskStatusList]);

  if (!pageInfo.hasOwnProperty("page")) {
    return <ListLoadingSpinner />;
  } else if (pageInfo.totalElements === 0) {
    return <Guidance text="업무가 존재하지 않습니다." />;
  }

  return (
    <Container>
      <StatusLegendContainer>
        {/* status 색 보여주는 화면 */}
        {taskStatusList.map(({ taskStatusId, taskStatus, color }) => (
          <StatusLegend key={taskStatusId} color={color}>
            {taskStatus}
          </StatusLegend>
        ))}
      </StatusLegendContainer>
      <TimelineContainer>
        <Header>RoadMap</Header>
        <StyledTimeline ref={timelineRef} />
      </TimelineContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f4f4f4;
`;

const TimelineContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const StyledTimeline = styled.div`
  width: 100%;
  height: 500px;
`;
const StatusLegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const StatusLegend = styled.div`
  background-color: ${({ color }) => color};
  color: #fff;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 14px;
`;
