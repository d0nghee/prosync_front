import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/auth/Error";
import Authentication, {
  action as authAction,
} from "./pages/auth/Authentication";
import { action as logoutAction } from "./pages/auth/Logout";
import { checkTokenLoader, accessTokenLoader } from "./util/auth";
import UserProfile, {
  action as userProfileEditAction,
} from "./pages/user/UserProfile";
import Tasks, { loader as tasksLoader } from "./pages/task/Tasks";
import TasksRoot from "./pages/task/TasksRoot";
import EditTask from "./pages/task/EditTask";
import NewTask from "./pages/task/NewTask";
import TaskDetail, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from "./pages/task/TaskDetail";
import { action as manipulateTaskAction } from "./components/task/TaskForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: accessTokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      // 사용자 인증
      { path: "auth", element: <Authentication />, action: authAction },
      { path: "logout", action: logoutAction },
      // users //
      {
        path: "user",
        children: [
          {
            path: "profile",
            element: <UserProfile />,
            action: userProfileEditAction,
            loader: checkTokenLoader,
          },
        ],
      },
      // projects //
      {
        path: "projects",
        children: [
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
