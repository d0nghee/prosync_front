import React, { useEffect, useRef } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import styled from 'styled-components';

export default function RoadmapViewList({ tasks, status }) {
  const timelineRef = useRef(); // 하나의 Timeline에 대한 ref를 저장할 변수
  console.log(status);

  useEffect(() => {
    // 모든 tasks를 하나의 타임라인에 추가
    const timelineData = tasks.map((task) => {
      // 해당 task의 statusId와 일치하는 status의 color 값을 찾기
      const taskStatusColor = status.find(
        (s) => s.taskStatusId === task.taskStatusId
      )?.color;
      console.log('taskStatusColor', taskStatusColor);

      return {
        id: task.taskId,
        content: task.title,
        start: task.startDate,
        end: task.endDate,
        style: `background-color: ${taskStatusColor}; color: #fff; border-radius: 4px;`,
      };
    });

    const items = new DataSet(timelineData);

    const options = {
      zoomMin: 1000 * 60 * 60 * 24, // 최소 줌 1일
      zoomMax: 1000 * 60 * 60 * 24 * 30,
      showCurrentTime: false, // 현재 시간 표시를 숨김
      timeAxis: { scale: 'day', step: 1 }, // 시간 축을 '일' 단위로 표시하고, 시간 눈금을 표시하지 않음
      height: '300px',
    };

    new Timeline(timelineRef.current, items, null, options);
  }, [tasks, status]);

  return (
    <Container>
      <StatusLegendContainer>
        {/* status 색 보여주는 화면 */}
        {status.map(({ taskStatusId, taskStatus, color }) => (
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
  height: 300px;
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
