import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import Authentication, {
  action as authAction,
} from "./pages/auth/Authentication";
import { action as logoutAction } from "./pages/auth/Logout";
import { checkTokenLoader, accessTokenLoader } from "./util/auth";
import UserProfile, {
  action as userProfileEditAction,
} from "./pages/user/UserProfile";
import Tasks from "./pages/task/Tasks";
import TasksRoot from "./pages/task/TasksRoot";
import EditTask from "./pages/task/EditTask";
import NewTask from "./pages/task/NewTask";
import TaskDetail, {
  action as deleteTaskAction,
} from "./pages/task/TaskDetail";
import NewProject from "./pages/project/NewProject";

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
                  { index: true, element: <Tasks /> },
                  {
                    path: ":taskId",
                    id: "task-details",
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
                      },
                    ],
                  },
                  {
                    path: "new",
                    element: <NewTask />,
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
  // return <Test></Test>;
}

export default App;
