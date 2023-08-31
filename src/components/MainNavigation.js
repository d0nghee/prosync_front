import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import axiosInstance from "../common/axiosInstance";
import UserProfile from "./UserProfile";

export default function MainNavigation() {
  // TODO: 로그인 직후 네비바 변경이 안됨 ,,,
  const token = useRouteLoaderData("root");
  const [userProfileImage, setUserProfileImage] = useState();

  useEffect(() => {
    axiosInstance
      .get("/members")
      .then((response) => {
        console.log(response);
        setUserProfileImage(response.data.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Prosync</NavLink>
          </li>

          <li>
            <input type="text" placeholder="프로젝트 검색" />
          </li>
          {/* 로그인 후 */}
          {token && (
            <li>
              <NavLink to="/alarm">알람아이콘(수정)</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/my-page">마이페이지</NavLink>
              <UserProfile profile={userProfileImage} />
            </li>
          )}
          {/* 로그인 전 */}
          {!token && (
            <li>
              <NavLink to="/auth?mode=signup">회원가입</NavLink>
            </li>
          )}

          {!token && (
            <li>
              <NavLink to="/auth?mode=login">로그인</NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>로그아웃</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
