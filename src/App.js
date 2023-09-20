import SignUp from '../src/pages/signup/SignUp';
import Login from './pages/signup/Login';
import Error from '../src/pages/Error';
import Home from '../src/pages/signup/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import MyPage from './pages/mypage/MyPage';
import ErrorPage from './pages/Error';
import Authentication, {
  action as authAction,
} from './pages/auth/Authentication';
import { action as logoutAction } from './pages/auth/Logout';
import { checkTokenLoader, accessTokenLoader } from './util/auth';
import UserProfile, {
  action as userProfileEditAction,
} from './pages/user/UserProfile';
import Tasks, { loader as tasksLoader } from './pages/task/Tasks';
import TasksRoot from './pages/task/TasksRoot';
import EditTask from './pages/task/EditTask';
import NewTask from './pages/task/NewTask';
import TaskDetail, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from './pages/task/TaskDetail';
import { action as manipulateTaskAction } from './components/task/TaskForm';
import { loader as projectLoader } from './pages/project/EditProject';
import NewProject from './pages/project/NewProject';
import NotificationRoot from './pages/notification/NotificationRoot';
import PersonalNotification from './pages/notification/PersonalNotification';
import ProjectNotification from './pages/notification/ProjectNotification';

import EditProejct from './pages/project/EditProject';
import ProjectList, {
  loader as projectListLoader,
} from './pages/project/ProjectList';
import TaskRoadmapView from './components/task/TaskRoadmapView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: accessTokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login />, errorElement: <Error /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
      // 사용자 인증
      { path: 'auth', element: <Authentication />, action: authAction },
      { path: 'logout', action: logoutAction },
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login />, errorElement: <Error /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
      // users //
      {
        path: 'user',
        children: [
          {
            path: 'profile',
            element: <UserProfile />,
            action: userProfileEditAction,
            loader: checkTokenLoader,
          },
        ],
      },
      // projects //
      {
        path: 'projects',
        children: [
          {
            index: true,
            id: 'projects',
            element: <ProjectList />,
            loader: projectListLoader,
          },
          { path: 'new', element: <NewProject /> },
          {
            id: 'project',
            path: ':projectId',
            element: <EditProejct />,
            loader: projectLoader,
            children: [
              // tasks //
              { index: true },
              {
                path: 'tasks',
                element: <TasksRoot />,
                children: [
                  { index: true, element: <Tasks />, loader: tasksLoader },
                  {
                    path: ':taskId',
                    id: 'task-details',
                    loader: taskDetailLoader,
                    children: [
                      {
                        index: true,
                        element: <TaskDetail />,
                        action: deleteTaskAction,
                        id: 'task-delete',
                      },
                      {
                        path: 'edit',
                        element: <EditTask />,
                        action: manipulateTaskAction,
                      },
                    ],
                  },
                  {
                    path: 'new',
                    element: <NewTask />,
                    action: manipulateTaskAction,
                  },
                ],
              },
            ],
          },
        ],
      },

      // notification
      {
        path: 'notificationList',
        element: <NotificationRoot />,
        children: [
          {
            index: true,
            id: 'personal-noti',
            element: <PersonalNotification />,
          },
          {
            path: 'projects/:projectId',
            id: 'project-noti',
            element: <ProjectNotification />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // return <TaskRoadmapView />;
}

export default App;
