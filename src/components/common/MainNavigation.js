import React, { useEffect, useState } from "react";
import {
  NavLink,
  Form,
  useRouteLoaderData,
  useNavigate,useLocation
} from "react-router-dom";
import { getCookie } from "../../util/cookies";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/reducers/loginSlice";
import { setCookie } from "./../../util/cookies";
import { getApi } from "../../util/api";
import { useCallback } from "react";
import { useRef } from "react";
import {
  faBars,
  faMagnifyingGlass,
  faBell,
  faFileInvoice,
  faBookmark,
  faFaceLaughSquint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";

const Header = styled.header`
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  padding: 1rem 0rem;
  color: black;
  box-shadow: 0px 0px 15px 0.5px;
  height: 9rem;

  & > nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & .title {
    width: 30rem;
    text-align: start;
    font-size: 2.5rem;
    margin-left: 9%;
  }

  & .list {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
    font-weight: bolder;
    position: relative;
    width: 100%;
  }

  & .toggleIcon {
    margin-left: 40px;
    cursor: pointer;
  }

  & .toggleIcon:hover {
    color: rgb(158, 105, 194);
  }

  & li a {
    text-decoration: none;
  }

  & li a:hover,
  a:active {
    color: rgb(158, 105, 194);
  }

  & .searchBar {
    width: 30%;
    display: flex;
    border-radius: 10px;
    align-items: center;
    padding: 0 1%;
    background-color: #d3d3d3;
    margin-right: 5%;
  }

  & li button {
    width: 5rem;
  }

  & .addtiontab {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > .notification-container {
      position: relative;
    }

    & > .notification-container *:nth-child(1) {
      color: gray;
      margin-right: 10%;
      cursor: pointer;
      transition: background-color 0.3s ease;
      border-radius: 50%;
      width: 2.5rem;
    }

    & > .notification-container:hover *:nth-child(1) {
      color: black;
      background-color: rgb(209, 209, 209);
    }

    & .notification-info {
      display: none;
      position: absolute;
      top: 130%;
      left: -15%;
      width: 3.4rem;
      height: 3.4rem;
      padding-top: 1rem;
      border-radius: 50%;
      border: 0.5px solid green;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      font-size: small;
      background-color: white;
    }

    & > .notification-container:hover .notification-info {
      display: block;
    }
  }

  & .logout {
    border: 0;
    background-color: white;
    cursor: pointer;
    font-weight: bolder;
    font-family: "Lato", sans-serif;

    &:hover {
      color: rgb(158, 105, 194);
    }
  }
`;

const SideNavbar = styled.div`
  background-color: #f9f9f9;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 10px 0px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1500;
  height: 100vh;
  background-color: lightgray;
  width: 13vw;
  transform: ${(props) =>
    props.show ? "translateX(0%)" : "translateX(-150%)"};
  transition: transform 0.5s ease-in-out;
  color: white;

  & .not-login-menu {
    width: 100%;
    height: 100%;
    background-color: rgb(57, 61, 84);
    font-size: large;
    padding: 5%;
    padding-top: 20%;
  }

  // sideNavbar의 목록에 설정
  & .profile-container {
    width: 100%;
    height: 30%;
    background-color: rgb(57, 61, 84);

    & .profile:hover {
      text-decoration: underline;
    }

    & img {
      margin-top: 30%;
      margin-left: 3%;
      width: 20%;
      height: 30%;
      object-fit: fill;
    }

    & > div:nth-child(2) {
      margin-left: 5%;
      height: 20%;
      margin-top: 25%;
      font-size: x-large;
    }
  }

  & .sidemenu-container {
    background-color: rgb(46, 49, 69);
    width: 100%;
    height: 55%;

    & > div:nth-child(1) {
      background-color: ${(props) =>
        props.isManagedProjectSelected ? "rgb(229,112,102)" : null};
    }

    & > div:nth-child(2) {
      background-color: ${(props) =>
        props.isBookMarkSelected ? "rgb(229,112,102)" : null};
    }

    & > div {
      height: 15%;
      font-size: large;
      display: flex;
      align-items: center;

      & > * {
        cursor: pointer;
      }

      & > *:nth-child(1) {
        margin-left: 10%;
        margin-right: 10%;
      }
    }
  }

  & .profile {
    display: flex;
    height: 60%;
    cursor: pointer;

    & > div {
      display: flex;
      flex-direction: column;
      margin-top: 31%;
      margin-left: 6%;
    }
  }

  & .menu-footer {
    background-color: rgb(57, 61, 84);
    width: 100%;
    height: 15%;

   & > div {
    display: flex;

    & > *:nth-child(1) {
      margin-left: 5%;
      margin-right: 5%;
      margin-top: 18%;
    }

    & > *:nth-child(2) {
      margin-top: 20%;
    }
   }
  }
`;

const SearchBar = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  width: 20rem;
  margin-left: 10rem;
  margin-right: 5rem;
  height: 3.5rem;
  width: 100%;
  margin: 0;
  border: 0px;
  background-color: #d3d3d3;
  font-size: large;
  font-weight: 900;

  &:focus {
    outline: none;

    &::placeholder {
      color: rgb(158, 105, 194);
    }
  }

  &::placeholder {
    text-align: center;
  }
`;

const SearchBox = styled.ul`
  background-color: rgb(238, 242, 249);
  box-shadow: 2px 2px 8px gray;
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  list-style-type: none;
  border-radius: 10px;
  width: 30%;
  padding: 0.2% 0;
  top: ${(props) =>
    props.searchBoxPosition ? `${props.searchBoxPosition.top}px` : null};
  left: ${(props) =>
    props.searchBoxPosition ? `${props.searchBoxPosition.left}px` : null};
  max-height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1000;

  & > *:not(:last-child):not(:nth-last-child(2)) {
    margin-bottom: 1rem;
  }
`;

const SearchBoxItem = styled.li`
  padding: 8px;
  background-color: white;
  border-radius: 10px;
  color: black;
  width: 100%;
  flex-shrink: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: ${(props) => (props.pointHover ? "8rem" : "4.5rem")};
  cursor: ${(props) => (props.pointHover ? "pointer" : null)};
  padding-top: ${(props) => (!props.pointHover ? "4.5%" : null)};
  padding-left: ${(props) => (!props.pointHover ? "10%" : null)};

  &:hover {
    font-size: ${(props) => (props.pointHover ? "larger" : null)};
    font-weight: ${(props) => (props.pointHover ? "700" : null)};
    color: ${(props) => (props.pointHover ? "white" : null)};
    background-color: ${(props) => (props.pointHover ? "rgb(50,62,92)" : null)};
    transform: ${(props) => (props.pointHover ? "scale(1.03)" : null)};
    transition: ${(props) => (props.pointHover ? "transform 0.3s ease" : null)};
  }

  & > img {
    width: 25%;
    height: 100%;
    object-fit: fill;
  }

  .itemTitle {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: center;
    margin-left: 5%;
    height: 100%;
    justify-content: space-around;

    & > div:nth-child(2) {
      margin-bottom: 10%;
      font-size: x-large;
    }
  }

  .itemName {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: center;
    height: 100%;
    justify-content: space-around;

    & > div:nth-child(2) {
      margin-bottom: 10%;
      font-size: x-large;
    }
  }
`;

export default function MainNavigation() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const dropdownRefSidebar = useRef(null);
  const dropdownRefSearchbar = useRef(null);
  const dropdownRefSearchBox = useRef(null);
  const [searchBoxPosition, setSearchBoxPosition] = useState({
    top: 0,
    left: 0,
  });
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isManagedProjectSelected, setIsManagedProjectSelected] =
    useState(false);
  const [isBookMarkSelected, setIsBookMarkSelected] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const isProjectsBookmark = location.pathname === '/projects' && location.search.includes("?bookmark=true");
    const isMyProjects = location.pathname === '/my-projects';

    if (!isProjectsBookmark && !isMyProjects ) {
      console.log("지나감");
      setIsManagedProjectSelected(false);
      setIsBookMarkSelected(false);
    }
  }, [location])

  const onManageChangeHandler = () => {
    setIsManagedProjectSelected(true);
    setIsBookMarkSelected(false);
    navigate("/projects?bookmark=true&page=1");
  };

  const onBookChangeHandler = () => {
    setIsBookMarkSelected(true);
    setIsManagedProjectSelected(false);
    navigate("/my-projects");
  };

  const projectFetch = useCallback(
    (inputValue) => {
      console.log("inpuValue: " + inputValue);
      console.log("searchList: ");
      console.log(searchList);

      if (page == 1) {
        console.log("page == 1 지나감");
        getApi(`/projects?search=${inputValue}&page=${page}&size=6`)
          .then((res) => {
            setSearchList([...res.data.data]);

            setPage((prevPage) => prevPage + 1);

            if (res.data.pageInfo.totalPages !== 0) {
              setMaxPage(res.data.pageInfo.totalPages);
            } else {
              setMaxPage(1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("page !==1 지나감" + page);
        getApi(`/projects?search=${inputValue}&page=${page}&size=6`)
          .then((res) => {
            console.log(res);
            setSearchList([...searchList, ...res.data.data]);
            setPage((prevPage) => prevPage + 1);
            setMaxPage(res.data.pageInfo.totalPages);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [page]
  );

  useEffect(() => {
    console.log("inView:" + inView);
    console.log(page);
    console.log("maxPage:" + maxPage);
    if (inView && page <= maxPage) {
      projectFetch(inputValue);
    }
  }, [inView, page, maxPage, projectFetch, inputValue, searchList]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  useEffect(() => {
    if (
      dropdownRefSearchbar.current &&
      dropdownRefSearchbar.current.parentElement
    ) {
      const childRect = dropdownRefSearchbar.current.getBoundingClientRect();
      const parentRect =
        dropdownRefSearchbar.current.parentElement.getBoundingClientRect();

      const relativeTop = childRect.top - parentRect.top;

      setSearchBoxPosition({
        top: relativeTop + childRect.height + 3,
        left: childRect.x,
      });
    }
  }, [showBox]);

  const [eventSource, setEventSource] = useState(null);
  let isLoggedIn = useIsLoggedIn(eventSource, setEventSource);

  const profile = getCookie("profile");
  const name = getCookie("name");
  const email = getCookie("email");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefSidebar.current &&
        !dropdownRefSidebar.current.contains(event.target)
      ) {
        setShowMenu(false);
      }

      if (
        dropdownRefSearchBox.current &&
        !dropdownRefSearchBox.current.contains(event.target)
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
    if (isLoggedIn && (!profile || !name || !email)) {
      getApi("/members").then(async (res) => {
        setCookie("profile", res.data.profileImage, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        setCookie("name", res.data.name, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        setCookie("email", res.data.email, {
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
    setIsBookMarkSelected(false);
    setIsManagedProjectSelected(false);
  };

  const searchChangeHandler = useCallback(
    (event) => {
      if (!isLoggedIn) {
        alert("로그인한 회원만 이용가능합니다.");
        setShowBox(false);
        navigate("/auth?mode=login");
      }

      const inputValue = event.target.value;

      if (inputValue === "" || inputValue === null) {
        setShowBox(false);
        return;
      }

      if (inputValue !== "" && inputValue !== null) {
        setShowBox(true);
        setInputValue(inputValue);
        setSearchList([]);
        setPage(1);
        setMaxPage(1);
        console.log("searchChangeHandler");
        console.log(searchList);

        console.log("바뀌는중");
        console.log(inputValue + `로 전환했음`);
      }
    },
    [isLoggedIn]
  );

  return (
    <Header>
      <nav>
        <ul className="list">
          <li className="toggle">
            <FontAwesomeIcon
              className="toggleIcon"
              icon={faBars}
              onClick={toggleMenu}
              size="2x"
            />
            <SideNavbar
              show={showMenu}
              ref={dropdownRefSidebar}
              isManagedProjectSelected={isManagedProjectSelected}
              isBookMarkSelected={isBookMarkSelected}
            >
              {isLoggedIn ? (
                <>
                  <div className="profile-container">
                    <div
                      className="profile"
                      onClick={() => {
                        setShowMenu(false);
                        navigate("/user/profile");
                      }}
                    >
                      <img src={profile}></img>
                      <div>
                        <div>{name}</div>
                        <div>{email}</div>
                      </div>
                    </div>
                    <div>Menu</div>
                  </div>
                  <div className="sidemenu-container">
                    <div>
                      <FontAwesomeIcon icon={faFileInvoice} />
                      <div onClick={() => onManageChangeHandler()}>
                        Managed Project
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faBookmark} />
                      <div onClick={() => onBookChangeHandler()}>Bookmark</div>
                    </div>
                  </div>
                  <div className="menu-footer">
                    <div>
                      <FontAwesomeIcon icon={faFaceLaughSquint} size='2x'/>
                      <div>Thank you for Inviting Site</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="not-login-menu">
                  로그인하셔야 이용하실 수 있는 메뉴입니다.
                </div>
              )}
            </SideNavbar>
          </li>
          <li className="title">
            <NavLink to="/">Prosync</NavLink>
          </li>
          <li className="searchBar" ref={dropdownRefSearchbar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            <SearchBar
              onClick={(event) => searchChangeHandler(event)}
              onChange={(event) => searchChangeHandler(event)}
              placeholder="프로젝트 검색하세요."
            ></SearchBar>
          </li>
          <SearchBox
            searchBoxPosition={searchBoxPosition}
            show={showBox}
            ref={dropdownRefSearchBox}
          >
            {searchList.length > 0 ? (
              searchList?.map((item) => {
                return (
                  <SearchBoxItem
                    key={item.projectId}
                    onClick={() => {
                      navigate(`/projects/${item.projectId}`);
                      setShowBox(false);
                    }}
                    pointHover={true}
                  >
                    <img src={item.projectImage}></img>
                    <div className="itemTitle">
                      <div>프로젝트</div>
                      <div>{item.title}</div>
                    </div>
                    <div className="itemName">
                      <div>담당자</div>
                      <div>{item.name}</div>
                    </div>
                  </SearchBoxItem>
                );
              })
            ) : (
              <SearchBoxItem pointHover={false}>
                해당 프로젝트가 존재하지 않습니다.
              </SearchBoxItem>
            )}
            <div ref={ref}></div>
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
            <li className="addtiontab">
              <div className="notification-container">
                <FontAwesomeIcon
                  icon={faBell}
                  size="2x"
                  onClick={() => navigate("/notification")}
                />
                <div className="notification-info">알림</div>
              </div>
              <Form action="/logout" method="post">
                <button className="logout" onClick={handleButtonClick}>
                  logout
                </button>
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
