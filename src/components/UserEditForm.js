import React from "react";
import { Form } from "react-router-dom";
import classes from "./UserEditForm.module.css";

export default function UserEditForm() {
  return (
    <Form method="patch">
      <p>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" />
      </p>
      <p>
        <label htmlFor="intro">소개글</label>
        <input type="text" id="intro" name="intro" />
      </p>
      <button>수정</button>
      <button type="button">취소</button>
    </Form>
  );
}
