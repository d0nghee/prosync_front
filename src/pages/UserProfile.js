import React from "react";
import { Form, redirect } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import UserEditForm from "../components/UserEditForm";

export default function UserProfile() {
  return <UserEditForm />;
}

export async function action({ request }) {
  const data = await request.formData();
  axiosInstance
    .patch("/members/profile", {
      intro: data.get("intro"),
      name: data.get("name"),
    })
    .then(function (response) {
      console.log("success");
      alert("수정 완료");
    })
    .catch(function (error) {});

  return redirect(".");
}
