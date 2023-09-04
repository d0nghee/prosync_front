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
      // TODO: 로컬 저장소에 회원 아이디 저장
      // localStorage.setItem("memberId", response.data.memberId);
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
    });

  if (mode === "login") {
    return redirect("/");
  }
  return redirect("/auth?mode=login");
}
