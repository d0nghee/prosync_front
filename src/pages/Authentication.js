import React from "react";
import axiosInstance from "../common/axiosInstance";
import AuthForm from "../components/AuthForm";
import { redirect } from "react-router-dom";

export default function Authentication() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if (mode === "signup") {
    mode = "members";
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  axiosInstance
    .post(`/${mode}`, authData)
    .then(function (response) {
      console.log(response);
      const accessToken = response.headers["authorization"];
      const refreshToken = response.headers["refresh"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        window.location.reload();
      }
    })
    .catch(function (error) {
      // 에러 처리
      console.log(error);
      if (error.response.status === 401) {
        alert('아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.');
        //TODO: 리다이렉트 안됨 확인.
        return redirect('/auth?mode=login');
      }
      if (error.response.status === 500) {
        return;
      }
    });

  if (mode === "login") {
    return redirect("/");
  }
  return redirect("/auth?mode=login");
}
