
import React, { useEffect, useRef } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Guidance from '../../common/Guidance';
import ListLoadingSpinner from '../../common/ListLoadingSpinner';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getApi } from '../../../util/api';
import {tryFunc} from '../../../util/tryFunc';

export default function RoadmapViewList() {
  const timelineRef = useRef(); // 하나의 Timeline에 대한 ref를 저장할 변수
  const tasks = useSelector((state) => state.taskList.list);
  const taskStatusList = useSelector((state) => state.taskStatus.list);
  const pageInfo = useSelector((state) => state.taskList.pageInfo);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const view = searchParams.get('view');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (tasks.length !== 0 && tasks[0].startDate) {
      const timelineData = tasks.map((task) => {
        let endDate = task.endDate;
        if (task.startDate === task.endDate) {
          let end = new Date(task.endDate);
          end.setDate(end.getDate() + 1);
          endDate = end.toISOString().slice(0, 10);
        }
        return {
          id: task.taskId,
          content: task.title,
          start: task.startDate,
          end: endDate,
          style: `background-color: ${task.color}; color: #fff; border-radius: 4px; cursor:pointer`,
        };
      });

      const items = new DataSet(timelineData);

      //TODO: 최소 1일 최대 한달
      const options = {
        zoomMin: 1000 * 60 * 60 * 24 * 30, // 최소 줌 1일
        zoomMax: 1000 * 60 * 60 * 24 * 30,
        height: '700px',
        timeAxis: { scale: 'day', step: 1 },
      };

      const timeline = new Timeline(timelineRef.current, items, null, options);
      tryFunc(() => getApi(`/projects/${params.projectId}`), 
       (response) => {
        timeline.setWindow(response.data.startDate, response.data.endDate);
      }, 
      dispatch)();

      timeline.on('select', function(properties) {
        if (properties.items.length > 0) {
          const selectedItemId = properties.items[0]; // 선택된 아이템의 ID를 가져옵니다.
          const selectedItem = items.get(selectedItemId); // ID를 사용하여 해당 아이템의 데이터를 가져옵니다.
          console.log("Selected item:", selectedItem);
          navigate(`/projects/${params.projectId}/tasks/${selectedItem.id}`);
        }
      });
    }
  }, [tasks, taskStatusList, params.projectId, view]);

  if (!pageInfo.hasOwnProperty('page')) {
    return <ListLoadingSpinner />;
  } else if (pageInfo.totalElements === 0) {
    return <Guidance text="업무가 존재하지 않습니다." />;
  }

  return (
    <Container>
      <StatusLegendContainer>
        {/* status 색 보여주는 화면 */}
        {taskStatusList &&
          taskStatusList.map(({ taskStatusId, taskStatus, color, seq }) => (
            seq !== 0 &&
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
  height: 700px;
`;

const StatusLegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const StatusLegend = styled.div`
  background-color: ${({ color }) => color};
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5rem;
  font-size: 14px;
  font-weight: bold;
`;
