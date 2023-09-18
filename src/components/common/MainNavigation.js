import React from "react";
import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getCookie } from "../../util/cookies";
import ProfileCard from "./ProfileCard";

export default function MainNavigation() {
  const isLoggedIn = Boolean(useRouteLoaderData("root"));

  const profile = getCookie("profile");
  const name = getCookie("name");

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
          {isLoggedIn && (
            <NavLink to="/user/profile">
              <ProfileCard name={name} image={profile} />
            </NavLink>
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
                <button>로그아웃</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
