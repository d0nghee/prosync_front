import React from "react";
import { Form, useNavigation, useSearchParams, Link, useNavigate } from "react-router-dom";
import SignUp from '../../pages/signup/SignUp'
import SignupImage from "../../assets/images/signup.jpg";
import Login from "../../pages/signup/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  },[isLoggedIn])


  return (
    <main>
      {!isLogin && (
        <SignUp></SignUp>
      )}
      {isLogin && (<Login></Login>)}
    </main>
  );
}
