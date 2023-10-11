import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../../util/cookies";
import ProfileCard from "./ProfileCard";
import { useDispatch } from "react-redux";
import { setCookie } from "./../../util/cookies";
import { deleteApi, getApi, patchApi } from "../../util/api";
import { useCallback } from "react";
import { useRef } from "react";
import {
  faBars,
  faMagnifyingGlass,
  faBell,
  faFileInvoice,
  faBookmark,
  faFaceLaughSquint,
  faLeftLong,
  faHouse,
  faFileSignature,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import ToastMessage from "./ToastMessage";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { useSelector } from "react-redux";
import { tryFunc } from "../../util/tryFunc";
import { debounce } from "../../util/debounce";
import { IoLogoSoundcloud } from "react-icons/io5";
import MemberProfile from "./MemberProfile";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";

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
  shouldForwardProp: (prop) => !["show"].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 10px 0px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1500;
  height: 100vh;
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

    display: flex;
    flex-direction: column;

    & > *:nth-child(1) {
      margin-left: 83%;
      margin-top: 2%;
      cursor: pointer;
    }
  }

  // sideNavbar의 목록에 설정
  & .profile-container {
    width: 100%;
    height: 30%;
    background-color: rgb(57, 61, 84);

    & > :nth-child(1) {
      margin-left: 83%;
      margin-top: 2%;
      cursor: pointer;
    }

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

    & > div:nth-child(3) {
      margin-left: 5%;
      height: 20%;
      margin-top: 10%;
      font-size: x-large;
    }
  }

  & .sidemenu-container {
    background-color: rgb(46, 49, 69);
    width: 100%;
    height: 55%;

    & > div {
      height: 15%;
      font-size: large;
      display: flex;
      align-items: center;
      cursor: pointer;

      & > *:nth-child(1) {
        margin-left: 10%;
        margin-right: 10%;
      }
    }

    & > div:hover {
      background-color: #ff006e;
    }

    & .notification-menu {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding-right: 1rem;
    }
  }

  & .profile {
    display: flex;
    height: 60%;
    cursor: pointer;
    max-width: 12vw;

    & > div {
      display: flex;
      flex-direction: column;
      margin-top: 31%;
      margin-left: 6%;
      max-width: 9vw;
    }

    & .email {
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: break-word;
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
  position: relative;
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

  &.no-project {
    color: gray;
    font-size: 1.2rem;
    font-weight: 800;
  }

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
    width: 40%;
    text-align: center;
    margin-left: 5%;
    height: 100%;
    justify-content: space-around;
    font-weight: 900;

    & > div:nth-child(2) {
      margin-bottom: 10%;
      font-size: 1.2rem;
    }
  }

  .itemName {
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: center;
    height: 100%;
    justify-content: space-around;
    font-weight: 900;

    & > div:nth-child(2) {
      margin-bottom: 10%;
      font-size: 1.2rem;
    }
  }
`;

const NotificationCount = styled.div`
  width: 30%;
  background-color: #848679;
  color: white;
  border-radius: 10px;
  margin-left: 9%;
  text-align: center;
`;

const ContextMenu = styled.div`
  position: fixed;
  width: 60%;
  z-index: 1000;
  display: block;
  left: 9%;
  top: 32%;
  border: 1px solid #e8f5ff;
  background-color: white;
  border-radius: 5px;

  & :nth-child(1):hover {
    background-color: #f1f1f1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  & :nth-child(3):hover {
    background-color: #f1f1f1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const MenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 0;
`;

export default function MainNavigation({ setMenuOpen }) {
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
  const location = useLocation();
  const [toasts, setToasts] = useState([]);
  const [eventSource, setEventSource] = useState(null);
  const profile = getCookie("profile");
  const name = getCookie("name");
  const email = getCookie("email");
  const memberId = getCookie("memberId");
  const [profileUpdate, setProfileUpdate] = useState(false);
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: "0px",
    left: "0px",
  });
  const trigger = useSelector((state) => state.trigger.trigger);
  const [isMenuItemHovered, setIsMenuItemHovered] = useState(false);
  const [memberProfile, setMemberProfile] = useState({ show: false });

  const fetchNotificationCount = async () => {
    const response = await getApi("/notification/count");
    return response.data;
  };

  const onNotificationCountSuccess = (data) => {
    setNotificationCount(data);
    console.log("sidebar count 성공");
  };

  useEffect(() => {
    const fetchAndHandleNotification = async () => {
      if (isLoggedIn && showMenu === true) {
        try {
          const data = await fetchNotificationCount();
          onNotificationCountSuccess(data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            if (location.pathname === "/") {
              alert("로그인이 만료되었습니다.");
              navigate(
                `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
              );
            }
            dispatch(setIsLoggedIn(false));
          } else if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            setMenuOpen(false);
            navigate("/error");
          }
        }
      }
    };

    fetchAndHandleNotification();
  }, [showMenu, location, trigger, isLoggedIn]);

  useEffect(() => {
    const hideContextMenu = (e) => {
      if (isContextMenuOpen) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", hideContextMenu);

    return () => {
      document.removeEventListener("mousedown", hideContextMenu);
    };
  }, [isContextMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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

  const onContextMenuHandler = (e) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuPosition({
      top: `${e.clientY}px`,
      left: `${e.clientX - 50}px`,
    });
  };

  const onNotificationReadHandler = (e) => {
    e.stopPropagation();
    if (window.confirm("알림을 모두 읽음 처리하시겠습니까?")) {
      patchApi("/notification/allRead")
        .then((response) => {
          alert("알림을 모두 읽음 처리하였습니다.");
          setShowMenu(false);
          setMenuOpen(false);
          navigate(`${location.pathname}?${queryParams.toString()}`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (location.pathname === "/") {
              alert("로그인이 만료되었습니다.");
              navigate(
                `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
              );
            }
            dispatch(setIsLoggedIn(false));
          } else if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            setMenuOpen(false);
            navigate("/error");
          }
        });
    } else {
      alert("알림 읽음 처리가 취소되었습니다.");
    }
  };

  const fetchNotificationDelete = async () => {
    const response = await deleteApi("/notification/deleteAll");
    return response;
  };

  const onNotificationDeleteSuccess = (data) => {
    alert("알림이 모두 삭제 처리되었습니다.");
    setShowMenu(false);
    setMenuOpen(false);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const onNotificationDeleteHandler = (e) => {
    e.stopPropagation();
    if (window.confirm("알림을 모두 삭제하시겠습니까?")) {
      deleteApi("/notification/deleteAll")
        .then((response) => {
          alert("알림이 모두 삭제 처리되었습니다.");
          setShowMenu(false);
          setMenuOpen(false);
          navigate(`${location.pathname}?${queryParams.toString()}`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (location.pathname === "/") {
              alert("로그인이 만료되었습니다.");
              navigate(
                `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
              );
            }
            dispatch(setIsLoggedIn(false));
          } else if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            setMenuOpen(false);
            navigate("/error");
          }
        });
    } else {
      alert("알림 삭제 처리가 취소되었습니다");
    }
  };

  const addToast = useCallback((data) => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [...prevToasts, { id, data }]);

    const timerId = setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 10000);

    return timerId;
  }, []);

  useIsLoggedIn(isLoggedIn, eventSource, setEventSource, addToast);

  useEffect(() => {
    // 멤버 관련 정보 소실 대비
    if (!isLoggedIn) {
      nullableCheck();
    }
  }, [location, isLoggedIn]);

  const projectFetchApi = async (inputValue) => {
    const response = await getApi(
      `/projects?search=${inputValue}&page=${page}&size=6`
    );
    return response.data;
  };

  const onProjectFetchSuccessHandler = useCallback(
    (data) => {
      setSearchList([...searchList, ...data.data]);

      setPage((prevPage) => prevPage + 1);
      setMaxPage(data.pageInfo.totalPages !== 0 ? data.pageInfo.totalPages : 1);
    },
    [searchList]
  );

  useEffect(() => {
    console.log("inView:" + inView);
    console.log("page:" + page);
    console.log("maxPage:" + maxPage);

    const projectFetch = (inputValue) => {
      console.log("inputValue: ", inputValue);
      getApi(`/projects?search=${inputValue}&page=${page}&size=6`)
        .then((response) => {
          onProjectFetchSuccessHandler(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log('로케이션');
            console.log(location.pathname);
            if (location.pathname === "/" || location.pathname === "/auth") {
              alert("로그인이 만료되었습니다.");
              setShowBox(false);
              navigate(
                `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
              );
              return;
            }
            dispatch(setIsLoggedIn(false));
            setShowBox(false);
          } else if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            setMenuOpen(false);
            navigate("/error");
          }
        });
    };

    if (inView && page <= maxPage) {
      projectFetch(inputValue);
    }
  }, [inView, page, maxPage, inputValue]);

  const toggleMenu = () => {
    console.log("toggleMenu동작");
    async function nullCheckAndSetState() {
      await nullableCheck();

      setShowMenu((showMenu) => !showMenu);
      setMenuOpen((show) => !show);
    }

    nullCheckAndSetState();
  };

  useEffect(() => {
    const updatePosition = () => {
      if (
        dropdownRefSearchbar.current &&
        dropdownRefSearchbar.current.parentElement
      ) {
        const childRect = dropdownRefSearchbar.current.getBoundingClientRect();
        const parentRect =
          dropdownRefSearchbar.current.parentElement.getBoundingClientRect();

        const relativeTop = childRect.top - parentRect.top;

        setSearchBoxPosition({
          top: relativeTop + childRect.height + 20,
          left: childRect.x,
        });
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [showBox]);

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
      tryFunc(fetchMemberInfo, onFetchMemberInfoSuccessHandler, dispatch)();
    }
  }, [isLoggedIn]);

  const handleButtonClick = () => {
    navigate("/logout");
  };

  const onfetchDataBasedOnInputSuccessHanlder = (data) => {
    console.log("fetDataBasedOnInputSucessHandler 실행");
    console.log(data.data);
    setSearchList([...data.data]);
    setMaxPage(data.pageInfo.totalPages);
    setPage(2);
  };

  console.log("test");

  const debouncedProjectFetch = debounce((inputValue) => {
    console.log("inputValue: ", inputValue);
    getApi(`/projects?search=${inputValue}&page=1&size=6`)
      .then((response) => {
        onfetchDataBasedOnInputSuccessHanlder(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("로케이션");
          console.log(location.pathname);
          if (location.pathname === "/auth") {
            alert("로그인이 만료되었습니다.");
            setShowBox(false);
            navigate(
              `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
            );
          }
        } else if (error === undefined) {
          console.error("An undefined error occured!");
          alert("알 수 없는 오류가 발생했습니다.");
          navigate("/error");
        } else if (error.code === "ERR_NETWORK") {
          console.error("네트워크 에러 발생:", error);
          alert(
            "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
          );
          setMenuOpen(false);
          navigate("/error");
        }
      });
  }, 500);

  const onClickHandler = useCallback(() => {
    if (!isLoggedIn) {
      alert("로그인한 회원만 이용가능합니다.");
      setShowBox(false);
      navigate("/auth?mode=login");
      return;
    }

    setShowBox(true);
  }, [isLoggedIn]);

  const onCloseToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  });

  const searchChangeHandler = useCallback(
    (event) => {
      if (!isLoggedIn) {
        alert("로그인한 회원만 이용가능합니다.");
        setShowBox(false);
        navigate("/auth?mode=login");
      }

      const newInputValue = event.target.value;

      if (newInputValue === "" || newInputValue === null) {
        console.log("newInputValue가 비었음");
        setSearchList([]);
        setShowBox(false);

        debouncedProjectFetch.cancel();
        return;
      } else {
        setShowBox(true);
        setInputValue(newInputValue);
        setPage(1);
        setMaxPage(1);
        setSearchList([]);
        console.log("진짜 검색어 받자마자 데이터 받아오는 로직");
        debouncedProjectFetch(newInputValue);

        console.log("searchChangeHandler");
        console.log(searchList);

        console.log("바뀌는중");
        console.log(newInputValue + `로 전환했음`);
      }
    },
    [isLoggedIn]
  );

  return (
    <>
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
              <SideNavbar show={showMenu} ref={dropdownRefSidebar}>
                {isLoggedIn ? (
                  <>
                    <div className="profile-container">
                      <FontAwesomeIcon
                        icon={faLeftLong}
                        size="2x"
                        onClick={() => {
                          setShowMenu(false);
                          setMenuOpen(false);
                        }}
                      />
                      <div
                        className="profile"
                        onClick={() => {
                          navigate("/user/profile");
                        }}
                      >
                        <img src={profile}></img>
                        <div>
                          <div>{name}</div>
                          <div className="email">{email}</div>
                        </div>
                      </div>
                      <div>Menu</div>
                    </div>
                    <div className="sidemenu-container">
                      <div onClick={() => navigate("/")}>
                        <FontAwesomeIcon icon={faHouse} />
                        <div>HOME</div>
                      </div>
                      <div onClick={() => navigate("/user/profile")}>
                        <FontAwesomeIcon icon={faUser} />
                        <div>MyPage</div>
                      </div>
                      <div onClick={() => navigate("/user/myprojects")}>
                        <FontAwesomeIcon icon={faFileInvoice} />
                        <div>Managed Project</div>
                      </div>
                      <div onClick={() => navigate("/user/bookmark")}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <div>Bookmark</div>
                      </div>
                      <div onClick={() => navigate("/notification")}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div
                          className="notification-menu"
                          onContextMenu={onContextMenuHandler}
                          isMenuItemHovered={isMenuItemHovered}
                        >
                          Notification
                          <NotificationCount>
                            {notificationCount >= 99
                              ? `+99`
                              : notificationCount}
                          </NotificationCount>
                          {isContextMenuOpen ? (
                            <ContextMenu
                              style={contextMenuPosition}
                              onMouseOver={() => setIsMenuItemHovered(true)}
                              onMouseOut={() => setIsMenuItemHovered(false)}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <MenuItem onClick={onNotificationReadHandler}>
                                모두 읽음 처리
                              </MenuItem>
                              <MenuDivider />
                              <MenuItem onClick={onNotificationDeleteHandler}>
                                모두 삭제 처리
                              </MenuItem>
                            </ContextMenu>
                          ) : null}
                        </div>
                      </div>
                      <div onClick={() => navigate("/notification/projects")}>
                        <FontAwesomeIcon icon={faFileSignature} />
                        <div>Project Log</div>
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
                    <FontAwesomeIcon
                      icon={faLeftLong}
                      size="2x"
                      onClick={() => {
                        setShowMenu(false);
                        setMenuOpen(false);
                      }}
                    />
                    <div>로그인하셔야 이용하실 수 있는 메뉴입니다.</div>
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
                onClick={() => onClickHandler()}
                onChange={(event) => searchChangeHandler(event)}
                placeholder="프로젝트 검색하세요."
              ></SearchBar>
            </li>

            {isLoggedIn && (
              <ProfileCard
                name={name}
                image={profile}
                setMemberProfile={setMemberProfile}
              />
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
        <SearchBox
          searchBoxPosition={searchBoxPosition}
          show={showBox}
          ref={dropdownRefSearchBox}
        >
          {console.log(searchList)}
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
            <SearchBoxItem className="no-project" pointHover={false}>
              해당 프로젝트가 존재하지 않습니다.
            </SearchBoxItem>
          )}
          {searchList.length > 0 && <div ref={ref}></div>}
        </SearchBox>
        {toasts.map((toast, index) => (
          <ToastMessage
            key={toast.id}
            id={toast.id}
            data={toast.data}
            bottom={`${2 + index * 10}rem`}
            onCloseToast={onCloseToast}
          />
        ))}
      </Header>
      {memberProfile.show && (
        <MemberProfile
          onClose={() => setMemberProfile({ show: false })}
          memberInformation={{ isOthers: false }}
        />
      )}
    </>
  );
}
