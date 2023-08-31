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
    console.log("test");
    mode = "members";
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  axiosInstance
    .post(`/${mode}`, authData)
    .then(function (response) {})
    .catch(function (error) {
      // 에러 처리
      console.log(error.response);
    });
  return redirect("/");
}
