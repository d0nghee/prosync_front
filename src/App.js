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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
