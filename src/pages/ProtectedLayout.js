import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useState } from "react";

export default function ProtectedLayout() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  console.log("로그인 상태:");
  console.log(isLoggedIn);

  useEffect(() => {
    console.log("protectedLayout의 useEffect 실행");
    if (!isLoggedIn) {
      if (
        !(
          location.pathname === "/logout" || location.pathname === "/user/leave"
        )
      ) {
        setTimeout(() => {
          alert(
            "로그인 하셔야 이용할 수 있습니다. 로그인 페이지로 이동합니다."
          );
          setIsLoading(false);
          navigate(
            `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
          );
        }, 1000);
      }
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, navigate, location]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
