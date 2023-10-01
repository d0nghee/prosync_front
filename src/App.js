import SignUp from "../src/pages/signup/SignUp";
import Login from "./pages/signup/Login";
import Error from "../src/pages/Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import MyPage from "../src/pages/mypage/MyPage";
import ErrorPage from "./pages/Error";
import Authentication, {
  action as authAction,
} from "./pages/auth/Authentication";
import { Logout, action as logoutAction } from "./pages/auth/Logout";
import { checkTokenLoader, accessTokenLoader } from "./util/auth";
import Tasks, { loader as tasksLoader } from "./pages/task/Tasks";
import TasksRoot from "./pages/task/TasksRoot";
import EditTask from "./pages/task/EditTask";
import NewTask from "./pages/task/NewTask";
import TaskDetail, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from "./pages/task/TaskDetail";
import { action as manipulateTaskAction } from "./components/task/TaskForm";
import NewProject from "./pages/project/NewProject";
import Project from "./components/notification/Project";
import NotificationList from "./components/notification/NotificationList";
import ProjectLogPreview from "./pages/notification/ProjectLogPreview";
import ProjectListContainer from "./pages/notification/ProjectListContainer";
import { useEffect, useState } from "react";
import Loading from "./components/common/Loading";
import Footer from "./components/common/Footer";
import LogOut from "../src/pages/auth/Logout";
import ProtectedLayout from "./pages/ProtectedLayout";
import Home from "./pages/Home";
import { loader as projectLoader } from "./pages/project/EditProject";
import NotificationRoot from "./pages/notification/NotificationRoot";
import PersonalNotification from "./pages/notification/PersonalNotification";
import ProjectNotification from "./pages/notification/ProjectNotification";

import EditProejct from "./pages/project/EditProject";
import ProjectList, {
  loader as projectListLoader,
} from "./pages/project/ProjectList";
import TaskRoadmapView from "./components/task/TaskRoadmapView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      // 사용자 인증
      { path: "/", element: <Home /> },
      { path: "auth", element: <Authentication /> },
      { path: "/login", element: <Login />, errorElement: <Error /> },
      { path: "/signup", element: <SignUp /> },

      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          { path: "logout", element: <Logout /> },

          {
            path: "/user/profile",
            element: <MyPage />,
          },

          // projects //
          {
            path: "projects",
            children: [
              { index: true, element: <NewProject /> },
              {
                path: ":projectId",
                children: [
                  // tasks //
                  { index: true },
                  {
                    path: "tasks",
                    element: <TasksRoot />,
                    children: [
                      { index: true, element: <Tasks />, loader: tasksLoader },
                      {
                        path: ":taskId",
                        id: "task-details",
                        loader: taskDetailLoader,
                        children: [
                          {
                            index: true,
                            element: <TaskDetail />,
                            action: deleteTaskAction,
                            id: "task-delete",
                          },
                          {
                            path: "edit",
                            element: <EditTask />,
                            action: manipulateTaskAction,
                          },
                        ],
                      },
                      {
                        path: "new",
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
            path: "notification",
            element: <NotificationRoot />,
            children: [
              {
                index: true,
                id: "personal-noti",
                element: <PersonalNotification />,
              },
              {
                path: "projects",
                id: "project-noti",
                element: <ProjectNotification />,
                children: [
                  { index: true, element: <ProjectLogPreview /> },
                  {
                    path: ":projectId",
                    element: <ProjectListContainer />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // users //
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <Loading /> : <RouterProvider router={router} />;
}

export default App;
