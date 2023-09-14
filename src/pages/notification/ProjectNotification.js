import React from 'react'
import ProjectList from './../../components/notification/ProjectList';
import NotificationSearchBar from './../../components/notification/NotificationSearchBar';
import NotificationList from './../../components/notification/NotificationList';

const ProjectNotification = () => {
  return (
    <>
    <ProjectList/>
    <NotificationSearchBar/>
    <NotificationList/>
    </>
  )
}

export default ProjectNotification;