import React from "react";
import { Outlet } from 'react-router-dom';
import ProjectList from './../../components/notification/ProjectList';
import { styled } from 'styled-components';
import SideView from './../../components/notification/SideView';

const ProjectNotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5%;
  min-height: 60rem;
`;

const ProjectNotification = () => {
  return (
    <ProjectNotificationContainer>
      <SideView/>
      <Outlet />
    </ProjectNotificationContainer>
  );
};

export default ProjectNotification;
