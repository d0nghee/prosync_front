import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import store from './redux/module/store'
import Login from "./pages/Login";
import Error from '../src/pages/Error'
import Home from '../src/pages/Home'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement : <Error /> ,
    children: [
      { path: '/', element : <Home />},
      { path: '/login', element: <Login />, errorElement : <Error /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
    ]
  },

]);


function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
