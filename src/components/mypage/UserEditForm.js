import React from "react";
import { Form } from "react-router-dom";
import classes from "./UserEditForm.module.css";
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
          <input
            type="text"
            id="name"
            name="name"
            className={classes.username_input}
          />
        </div>
        <div>
          <label htmlFor="intro">소개글</label>
          <textarea
            type="text"
            id="intro"
            name="intro"
            className={classes.user_intro_input}
          />
        </div>
        <div className={classes.buttons}>
          <Button buttonName="수정" type="submit" />
          <Button buttonName="취소" type="button" />
        </div>
      </Form>
    </main>
  );
}
