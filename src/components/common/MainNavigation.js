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
import { NavLink, Form, useRouteLoaderData, Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getCookie } from "../../util/cookies";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/reducers/loginSlice";
import { setCookie } from "./../../util/cookies";
import { getApi } from "../../util/api";
import { useCallback } from "react";
import { useRef } from "react";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

const Header = styled.header`
  display: flex;
  max-width: 100%;
  background-color: #2f3e46;
  box-sizing: border-box;
  flex-direction: row;
  padding: 1rem 0rem;

  & > nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  & .title {
    width: 50rem;
    text-align: start;
    font-size: 2.5rem;
    margin-left: 3%;
  }

  & .list {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
    font-weight: bolder;
  }

  & .toggle:nth-child(1) {
    margin-left: 40px;
    cursor: pointer;
  }

  & .toggle:nth-child(1):hover {
    color: #fedc97;
  }

  & li a {
    text-decoration: none;
    color: white;
  }

  & li a:hover,
  a:active {
    color: #fedc97;
  }

  & .searchBar > input {
  }

  & li button {
    width: 5rem;
  }
`;

const SideNavbar = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: #f9f9f9;
  position: fixed;
  top: 0px;
  box-shadow: 10px 0px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: "1500";
  // sideNavbar의 목록에 설정하는 값
  & a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  & a:hover {
    background-color: #f1f1f1;
  }
`;

const SearchBar = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  width: 20rem;
  margin-left: 10rem;
  margin-right: 5rem;
  background-color: white;
  border: 1px solid black;
  height: 3.5rem;

  &:focus {
    outline: none;
    background-color: #d3d3d3;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-color: #888;
  }

  &::placeholder {
    text-align: center;
  }
`;

const SearchBox = styled.ul`
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  list-style-type: none;
  width: 20%;
  padding: 0;
  right: 21%;
  top: ${(props) => (props.searchBoxPosition ? props.searchBoxPosition.top : null)};
  left: ${(props) => (props.searchBoxPosition ? props.searchBoxPosition.left : null)};
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SearchBoxItem = styled.li`
  padding: 8px;
  background-color: #7986cb;
  border: 1px solid white;
  color: white;
  width: 100%;
  cursor: pointer;

  &:hover {
    font-size: larger;
    font-weight: 700;
    color: wheat;
  }
`;

export default function MainNavigation() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const dropdownRefSidebar = useRef(null);
  const dropdownRefSearchbar = useRef(null);
  const [searchBoxPosition, setSearchBoxPosition] = useState({ top: 0, left: 0 });





  const navigate = useNavigate();


  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  useEffect(() => {
    if (dropdownRefSearchbar.current) {
      const rect = dropdownRefSearchbar.current.getBoundingClientRect();
      setSearchBoxPosition({
        top: rect.bottom, 
        left: rect.left
      });
    }
  }, [showBox]);  

  const [eventSource, setEventSource] = useState(null);
  let isLoggedIn = useIsLoggedIn(eventSource, setEventSource);

  const profile = getCookie("profile");
  const name = getCookie("name");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefSidebar.current &&
        !dropdownRefSidebar.current.contains(event.target)
      ) {
        setShowMenu(false);
      }

      if (
        dropdownRefSearchbar.current &&
        !dropdownRefSearchbar.current.contains(event.target)
      ) {
        setShowBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nullableCheck = useCallback(() => {
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
  }, [isLoggedIn]);

  nullableCheck();

  const handleButtonClick = () => {
    dispatch(setIsLoggedIn());
    isLoggedIn = false;
  };

  const searchChangeHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue!=='' && inputValue!==null) {
      setSearchValue(inputValue);

      setTimeout( ()=> {
  
        getApi(`/projects?search=${inputValue}`).then((res)=> {
          console.log(res.data.data);
          setSearchList(res.data.data);
        }).catch((error) => {
          console.log(error);
        });
  
        setShowBox(true);
    },1000);
      console.log('바뀌는중');
    }
   

  }

  return (
    <Header>
      <nav>
        <ul className="list">
          <li className="toggle">
            <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
            <SideNavbar show={showMenu} ref={dropdownRefSidebar}>
              <div
                style={{
                  height: "100vh",
                  backgroundColor: "lightgray",
                  width: "15vw",
                }}
              ></div>
            </SideNavbar>
          </li>
          <li className="title">
            <NavLink to="/">Prosync</NavLink>
          </li>
          <li className="searchBar">
            <SearchBar onClick={searchChangeHandler} onChange={searchChangeHandler} placeholder='프로젝트 검색하세요.'></SearchBar>
          </li>
          <SearchBox searchBoxPosition={searchBoxPosition} show={showBox} ref={dropdownRefSearchbar}>
            {searchList?.map((item) => {
              return (
                <SearchBoxItem key={item.projectId} onClick={() => navigate(`/projects/${item.projectId}`)}>
                  {item.title}
                </SearchBoxItem>
              );
            })}
          </SearchBox>
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
    </Header>
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
