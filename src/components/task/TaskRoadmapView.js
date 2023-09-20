import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import { styled } from 'styled-components';

const RoadmapContainer = styled.div`
  width: 100%;
  height: 650px;
`;

const TaskDetailContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
`;

const TaskTitle = styled.h3``;

const TaskDescription = styled.p``;

function Roadmap() {
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = [
    {
      title: 'Task 1',
      startDate: '2023-01-01',
      endDate: '2023-01-10',
      description: 'First task of the year.',
    },
    {
      title: 'Task 2',
      startDate: '2023-01-15',
      endDate: '2023-01-30',
      description: 'Second task of the month.',
    },
    {
      title: 'Task 3',
      startDate: '2023-02-05',
      endDate: '2023-02-20',
      description: 'A task in February.',
    },

    {
      title: 'Task 4',
      startDate: '2023-02-25',
      endDate: '2023-03-05',
      description: 'End of February task.',
    },
    {
      title: 'Task 5',
      startDate: '2023-03-10',
      endDate: '2023-03-20',
      description: 'Mid March task.',
    },
  ];

  const items = tasks.map((task) => ({
    title: task.startDate + ' to ' + task.endDate,
    cardTitle: task.title,
    cardSubtitle: 'Duration: ' + task.startDate + ' - ' + task.endDate,
    cardDetailedText: task.description,
  }));

  const handleItemClick = (e, item) => {
    setSelectedTask(item);
  };

  return (
    <RoadmapContainer>
      <Chrono
        items={items}
        mode="VERTICAL"
        slideShow={false}
        onItemClick={handleItemClick}
      />
      {selectedTask && (
        <TaskDetailContainer>
          <TaskTitle>{selectedTask.cardTitle}</TaskTitle>
          <TaskDescription>{selectedTask.cardSubtitle}</TaskDescription>
          <TaskDescription>{selectedTask.cardDetailedText}</TaskDescription>
        </TaskDetailContainer>
      )}
    </RoadmapContainer>
  );
}

export default Roadmap;
