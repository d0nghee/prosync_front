import React from "react";
import { redirect } from "react-router-dom";
import UserEditForm from "../components/UserEditForm";
import { patchApi } from "../util/api";
import { setCookie } from "../util/cookies";

export default function UserProfile() {
  return <UserEditForm />;
}

export async function action({ request }) {
  const data = await request.formData();
  await patchApi("/members/profile", {
    intro: data.get("intro"),
    name: data.get("name"),
  })
    .then(async (response) => {
      //TODO : 프로필이미지 추가
      setCookie("name", data.get("name"), { path: "/" });
      alert("수정 완료");
    })
    .catch((error) => {});

  return redirect(".");
}
