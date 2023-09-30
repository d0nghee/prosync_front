import React from "react";
import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";
import Footer from "../components/common/Footer";
import { getCookie } from "../util/cookies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/reducers/loginSlice"

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getCookie("accessToken");
  const submit = useSubmit();

  useEffect(() => {
    console.log('RootLayout useEffect 실행');
    if (!accessToken) {
      const refreshToken = getCookie("refreshToken");

      if (!refreshToken) {
        console.log('refresh Token 존재하지 않음');
        dispatch(setIsLoggedIn(false));
        return;
      }
    }

    if (accessToken === "EXPIRED") {
      alert('로그인이 만료되었습니다.');
      navigate('/logout');
    }

  }, [accessToken, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
