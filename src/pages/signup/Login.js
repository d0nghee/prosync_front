import React, { useState } from "react";
import CustomButton from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "./components/loginForm";
import { LoginButtonContainer } from "../../css/LoginStyle";
import { setLoggedIn, setLoginFormData } from "../../redux/reducers/loginSlice";
import axiosInstance from "../../util/axios/axiosInstances";
import { setCookie } from "../../util/cookies";


export default function Login() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navi = useNavigate();


  const handleInputChange = (name, value) => {
    if (name === "email") {
      handleEmailChange(value);
    } else if (name === "password") {
      handlePasswordChange(value);
    }
  };

  const handleEmailChange = (value) => {
    dispatch(
      setLoginFormData({
        ...login.loginFormData,
        email: value,
      })
    );
  };

  const handlePasswordChange = (value) => {
    dispatch(
      setLoginFormData({
        ...login.loginFormData,
        password: value,
      })
    );
  };

  const handleLogin = async () => {
    
    axiosInstance.post("/login", login.loginFormData)
    .then(async (response) => {
      const header = response.headers;
      const access = await header.authorization;
      const refresh = await header.refresh;

      if (access && refresh) {
        setCookie("accessToken", access, { path : "/"});
        setCookie("refreshToken", refresh, { path : "/"});
      }

      navi("/");
      return response.status;
      
    })
  };

  const handleSignup = () => {
    navi("/signup");
  };


  return (
    <div>
      <div>
        <LoginForm onChange={handleInputChange}></LoginForm>
      </div>
      <LoginButtonContainer>
        <CustomButton
          backgroundColor="#7B69B7"
          label="로그인"
          onClick={handleLogin}
        />
        <CustomButton
          label="회원가입"
          backgroundColor="#7E99A1"
          onClick={handleSignup}
        />
      </LoginButtonContainer>
    </div>
  );
}
