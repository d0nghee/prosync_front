import React from "react";
import { Form, useNavigation, useSearchParams, Link } from "react-router-dom";
import SignupImage from "../../assets/images/signup.jpg";
import classes from "./AuthForm.module.css";

export default function AuthForm() {
  const [searchPaarams] = useSearchParams();
  const isLogin = searchPaarams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className={classes.signup}>
      {!isLogin && (
        <img
          src={SignupImage}
          alt="회원가입이미지"
          style={{ height: "1000px" }}
        />
      )}
      <Form method="post">
        <h1>Prosync</h1>
        <h2>{isLogin ? "로그인" : "회원가입"}</h2>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <button disabled={isSubmitting}>
          {isSubmitting ? "제출중.." : isLogin ? "로그인" : "회원가입"}
        </button>
        <Link to={isLogin ? "?mode=signup" : "?mode=login"}>
          {!isLogin ? "로그인" : "회원가입"} 하러가기
        </Link>
      </Form>
    </main>
  );
}
