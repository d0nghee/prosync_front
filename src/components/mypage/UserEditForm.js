import React from "react";
import { Form } from "react-router-dom";
import Button from "../common/Button";
import { getCookie } from "../../util/cookies";

export default function UserEditForm() {
  const profileImage = getCookie("profile");
  return (
    <main>
      <Form method="post" encType="multipart/form-data">
        <img
          src={profileImage}
          alt="회원프로필이미지"
          style={{ width: "15rem" }}
        />
        <input type="file" accept="image/*" style={{ display: "hidden" }} />
        <Button buttonName="이미지 변경" type="submit" />
      </Form>
      <Form method="patch">
        <div>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="intro">소개글</label>
          <textarea type="text" id="intro" name="intro" />
        </div>
        <div>
          <Button buttonName="수정" type="submit" />
          <Button buttonName="취소" type="button" />
        </div>
      </Form>
    </main>
  );
}
