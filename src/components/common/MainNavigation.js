import React from "react";
import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Button from "./Button";
import NotiImage from "../../assets/images/noti_icon.png";
import { getCookie } from "../../util/cookies";

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
                <img src={profile} alt="" />
                <span>{`${name}님`}</span>
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
