import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import classes from "./MainNavigation.module.css";
import Button from "./Button";
import NotiImage from "../assets/img/noti_icon.png";

export default function MainNavigation() {
  // TODO: 로그인 직후 네비바 변경
  const isLoggedIn = Boolean(useRouteLoaderData("root"));
  const [userProfileImage, setUserProfileImage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      axiosInstance
        .get("/members")
        .then((response) => {
          console.log(response);
          setUserProfileImage(response.data.profileImage);
          setUserName(response.data.name);
          localStorage.setItem('profile', response.data.profileImage);
        })
        .catch((error) => {
          console.log("유저 프로필 get 요청 에러 발생", error);
        });
    }
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li className={classes.title}>
            <NavLink to="/">Prosync</NavLink>
          </li>
          <li>
            <input type="text" placeholder="프로젝트 검색" />
          </li>
          {/* 로그인 후 */}
          {isLoggedIn && (
            <li>
              <NavLink to="/alarm">
                <img src={NotiImage} alt="알림" className={classes.icon} />
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <Link to="user/profile">
              <li className={classes.user}>
                <img src={userProfileImage} alt="" />
                <span>{`${userName}님`}</span>
              </li>
            </Link>
          )}
          {/* 로그인 전 */}
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth?mode=signup">signup</NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <NavLink to="/auth?mode=login">login</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Form action="/logout" method="post">
                {/* 컴포넌트 */}
                <Button buttonName="로그아웃" />
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
