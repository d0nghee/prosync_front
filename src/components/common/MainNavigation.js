// import React from "react";
// import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
// import classes from "./MainNavigation.module.css";
// import { getCookie } from "../../util/cookies";
// import ProfileCard from "./ProfileCard";
// import { useDispatch } from "react-redux";
// import { setIsLoggedIn } from "../../redux/reducers/loginSlice";
// import { setCookie } from "./../../util/cookies";
// import { getApi } from "../../util/api";
// import { useEffect } from "react";

// export default function MainNavigation() {
//   const isLoggedIn = Boolean(useRouteLoaderData("root"));
//   const dispatch = useDispatch();

//   console.log(useRouteLoaderData('root'));

//   const profile = getCookie("profile");
//   const name = getCookie("name");

//   const nullableCheck = () => {
//     if (isLoggedIn && (!profile || !name)) {
//       getApi("/members").then(async (res) => {
//         setCookie("profile", res.data.profileImage, {
//           path: "/",
//           maxAge: 60 * 60 * 24 * 30,
//         });
//         setCookie("name", res.data.name, {
//           path: "/",
//           maxAge: 60 * 60 * 24 * 30,
//         });
//       });
//     }
//   };

//   nullableCheck();

//   const handleButtonClick = () => {
//     dispatch(setIsLoggedIn());
//   };

//   return (
//     <header className={classes.header}>
//       <nav>
//         <ul className={classes.list}>
//           <li className={classes.title}>
//             <NavLink to="/">Prosync</NavLink>
//           </li>
//           <li>
//             <input type="text" placeholder="프로젝트 검색" />
//           </li>
//           {isLoggedIn && (
//             <NavLink to="/user/profile">
//               <ProfileCard name={name} image={profile} />
//             </NavLink>
//           )}
//           {/* 로그인 전 */}
//           {!isLoggedIn && (
//             <li>
//               <NavLink to="/auth?mode=signup">signup</NavLink>
//             </li>
//           )}

//           {!isLoggedIn && (
//             <li>
//               <NavLink to="/auth?mode=login">login</NavLink>
//             </li>
//           )}
//           {isLoggedIn && (
//             <li>
//               <Form action="/logout" method="post">
//                 {/* 컴포넌트 */}
//                 <button onClick={handleButtonClick}>로그아웃</button>
//               </Form>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getCookie } from "../../util/cookies";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/reducers/loginSlice";
import { setCookie } from "./../../util/cookies";
import { getApi } from "../../util/api";
import { useCallback } from "react";

export default function MainNavigation() {
  const dispatch = useDispatch();
  const [eventSource, setEventSource] = useState(null);
  const isLoggedIn = useIsLoggedIn(eventSource, setEventSource);


  const profile = getCookie("profile");
  const name = getCookie("name");

  const nullableCheck = () => {
    if (isLoggedIn && (!profile || !name)) {
      getApi("/members").then(async (res) => {
        setCookie("profile", res.data.profileImage, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        setCookie("name", res.data.name, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      });
    }
  };

  nullableCheck();

  const handleButtonClick = () => {
    dispatch(setIsLoggedIn());
    isLoggedIn=false;
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
                <button onClick={handleButtonClick}>로그아웃</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

function useIsLoggedIn(eventSource, setEventSource) {
  const isLoggedIn = Boolean(useRouteLoaderData("root"));

  useEffect(() => {
    if (isLoggedIn) {
      if (!eventSource) {
        console.log("여기 지나감");
        const memberId = getCookie("memberId");
        const newEventSource = new EventSource(
          `http://localhost:8080/api/v1/subscribe/${memberId}`
        );
        setEventSource(newEventSource);

        newEventSource.addEventListener("sse", (event) => {
          console.log(event.data);
          
          let data = JSON.parse(event.data);

          if (!data.isCountMessage) {
            data = data.notificationResponse;
          }
          
          (async () => {
            // 브라우저 알림
            const showNotification = () => {
              const notification = new Notification("알림이 왔습니다", {
                body: data.content,
              });

              setTimeout(() => {
                notification.close();
              }, 10 * 1000);

              notification.addEventListener("click", () => {
                window.open(data.url, "_blank");
              });
            };

            // 브라우저 알림 허용 권한
            let granted = false;

            if (Notification.permission === "granted") {
              granted = true;
            } else if (Notification.permission !== "denied") {
              let permission = await Notification.requestPermission();
              granted = permission === "granted";
            }

            // 알림 보여주기
            if (granted) {
              showNotification();
            }
          })();
        });

        newEventSource.addEventListener("error", function (event) {
          if (event.target.readyState === EventSource.CLOSED) {
            console.log("SSE closed");
          } else if (event.target.readyState === EventSource.CONNECTING) {
            console.log("SSE reconnecting");
          } else {
            console.error("SSE error:", event);
          }
        });
      }
    } else {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    }
  }, [isLoggedIn]);

  return isLoggedIn;
}
