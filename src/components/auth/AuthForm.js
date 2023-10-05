import React from "react";
import { Form, useNavigation, useSearchParams, Link } from "react-router-dom";
import SignUp from '../../pages/signup/SignUp'
import Login from "../../pages/signup/Login";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";


  return (
    <main>
      {!isLogin && (
        <SignUp></SignUp>
      )}
      {isLogin && (<Login></Login>)}
    </main>
  );
}