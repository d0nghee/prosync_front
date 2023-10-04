import React, { useEffect, useState } from "react";
import {
  NavLink,
  Form,
  useRouteLoaderData,
  useNavigate,
  useLocation,
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
import ToastMessage from "./ToastMessage";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { useSelector } from "react-redux";
import { tryFunc } from "../../util/tryFunc";
import { debounce } from "../../util/debounce";

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

const SideNavbar = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["isManagedProjectSelected", "isBookMarkSelected", "show"].includes(prop),
})`
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

const SearchBox = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["searchBoxPosition", "show"].includes(prop),
})`
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

const SearchBoxItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !["pointHover"].includes(prop),
})`
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
  const [toasts, setToasts] = useState([]);
  const [eventSource, setEventSource] = useState(null);
  const profile = getCookie("profile");
  const name = getCookie("name");
  const email = getCookie("email");
  const memberId = getCookie("memberId");
  const [profileUpdate, setProfileUpdate] = useState(false);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);

  const addToast = useCallback((data) => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [...prevToasts, { id, data }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 10000);
  }, []);

  useIsLoggedIn(isLoggedIn, eventSource, setEventSource, addToast);

  useEffect(() => {
    // 멤버 관련 정보 소실 대비
    async function nullCheckAndSetState() {
      await nullableCheck();
      const isProjectsBookmark =
        location.pathname === "/projects" &&
        location.search.includes("?bookmark=true");
      const isMyProjects = location.pathname === "/my-projects";

      if (!isProjectsBookmark && !isMyProjects) {
        console.log("지나감");
        setIsManagedProjectSelected(false);
        setIsBookMarkSelected(false);
      }
    }

    nullCheckAndSetState();
  }, [location]);

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

  const debouncedProjectFetch = useCallback(debounce(
    (inputValue) => {
      console.log("inputValue: ", inputValue);
      tryFunc(
        projectFetchApi,
        onProjectFetchSuccessHandler,
        errorHandler
      )(inputValue);
    }, 500
  ), [page, searchList])


  const projectFetchApi = async (inputValue) => {
    const response = await getApi(
      `/projects?search=${inputValue}&page=${page}&size=6`
    );
    return response.data;
  };



  const onProjectFetchSuccessHandler = (data) => {
    if (page === 1) {
      setSearchList([...data.data]);
    } else {
      setSearchList([...searchList, ...data.data]);
    }
    setPage((prevPage) => prevPage + 1);
    setMaxPage(data.pageInfo.totalPages !== 0 ? data.pageInfo.totalPages : 1);
  };

  const errorHandler = {
    401: (error) => {
      console.log("여기지나감");
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      setIsLoggedIn(false);
      navigate(
        `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
      );
    },
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },

    /// 에러 코드 추가
    default: (error) => {
      console.error("Unknown error:", error);
      alert("프로젝트 목록을 가져오는 중 오류가 발생하였습니다.");
    },
  };


  useEffect(() => {
    console.log("inView:" + inView);
    console.log(page);
    console.log("maxPage:" + maxPage);
    if (inView && page <= maxPage) {
      debouncedProjectFetch(inputValue);
    }
  }, [inView, page, maxPage, debouncedProjectFetch, inputValue, searchList]);

  const toggleMenu = () => {
    console.log("toggleMenu동작");
    async function nullCheckAndSetState() {
      await nullableCheck();

      setShowMenu((showMenu) => !showMenu);
    }

    nullCheckAndSetState();
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

  const fetchMemberInfo = async () => {
    const res = await getApi("/members");
    return res.data;
  };

  const onFetchMemberInfoSuccessHandler = (data) => {
    setCookie("profile", data.profileImage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("name", data.name, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("email", data.email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("memberId", data.memberId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    setProfileUpdate((prevState) => !prevState);
  };

  const fetMemberInfoErrorHandler = {
    404: (error) => {
      console.log(error.response.status);
      alert("회원 정보를 찾지 못하였습니다.");
    },
    default: (error) => {
      console.log(error);
    },
  };

  const nullableCheck = useCallback(async () => {
    console.log("nullableCheck 중");
    console.log(getCookie("profile"));
    if (
      isLoggedIn &&
      (!getCookie("profile") ||
        !getCookie("name") ||
        !getCookie("email") ||
        !getCookie("memberId"))
    ) {
      tryFunc(
        fetchMemberInfo,
        onFetchMemberInfoSuccessHandler,
        fetMemberInfoErrorHandler
      )();
    }
  }, [isLoggedIn]);

  const handleButtonClick = () => {
    setIsBookMarkSelected(false);
    setIsManagedProjectSelected(false);

    navigate("/logout");
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
                      <FontAwesomeIcon icon={faFaceLaughSquint} size="2x" />
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
              <button className="logout" onClick={handleButtonClick}>
                logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      {toasts.map((toast, index) => (
        <ToastMessage
          key={toast.id}
          data={toast.data}
          bottom={`${2 + index * 10}rem`}
        />
      ))}
    </Header>
  );
}
