import React from "react";
import { Form, useNavigation, useSearchParams, Link } from "react-router-dom";

export default function AuthForm() {
  const [searchPaarams] = useSearchParams();
  const isLogin = searchPaarams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
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
        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "제출중.." : isLogin ? "로그인" : "회원가입"}
          </button>
          <Link to={isLogin ? "?mode=signup" : "?mode=login"}>
            {!isLogin ? "로그인" : "회원가입"} 하러가기
          </Link>
        </div>
      </Form>
    </>
  );
}
