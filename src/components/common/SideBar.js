import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { deleteApi, getApi, patchApi } from "../../util/api";
import { json } from "react-router";
import ExpandArrow from "./ExpandArrow";

const Direction = styled.div`
  position: absolute;
  right: 5%;
  top: 2%;

  & :hover {
    background-color: #e9ecef;
    padding: 10px;
  }
`;

const SidebarContainer = styled.div`
  width: 12%;
  transform: ${(props) => (props.isOpen ? 'translateX(0%)' : 'translateX(-150%)')};
  transition: transform 0.5s ease-in-out;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px;
  background-color: #f2f7f5;
`;



const List = styled.ul.attrs({
  className: "list-unstyled",
})``;

const ListItem = styled.li.attrs({
  className: "my-3",
})`
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 0;

  &:hover {
    background-color: ${(props) =>
      props.isMenuItemHovered ? "initial" : "#e9ecef"};
    padding: ${(props) =>
      props.isMenuItemHovered ? "10px 0" : "10px 0px 10px 10px"};
  }

  img {
    margin-right: 10px;
    height: 18px;
    width: auto;
  }
`;

const NotificationCount = styled.div`
  width: 30%;
  background-color: #848679;
  color: white;
  border-radius: 10px;
  margin-left: 25%;
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

//TODO: 페이지 따라 메뉴 내용 바꾸기
function SideBar({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isMenuItemHovered, setIsMenuItemHovered] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: "0px",
    left: "0px",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hideChangeHandler = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    console.log("sidebar 호출")
    getApi("/notification/count")
      .then((response) => {
        if (response && response.status === 200) {
          setNotificationCount(response.data);
          console.log("sidebar count 성공")
        }
      })
      .catch((error) => {
        throw json(
          { status: error.response.status },
          { message: error.response.data.resultCode }
        );
      });
  },[isSidebarOpen,location,notificationCount]);

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
          if (response && response.status === 200) {
            alert("알림이 모두 읽음 처리되었습니다.");
            setIsSidebarOpen(false);
            return;
          }
        })
        .catch((error) => {
          throw json(
            { status: error.response.status },
            { message: error.response.data.resultCode }
          );
        });

      navigate(`${location.pathname}?${queryParams.toString()}`)

    } else {
      alert("알림 읽음 처리가 취소되었습니다.");
    }
  };

  const onNotificationDeleteHandler = (e) => {
    e.stopPropagation();
    if (window.confirm("알림을 모두 삭제하시겠습니까?")) {
      deleteApi("/notification/deleteAll")
        .then((response) => {
          if (response && response.status === 200) {
            alert("알림이 모두 삭제 처리되었습니다.");
            setIsSidebarOpen(false);
            return;
          }
        })
        .catch((error) => {
          throw json(
            { status: error.response.status },
            { message: error.response.data.resultCode }
          );
        });

      navigate(`${location.pathname}?${queryParams.toString()}`)

    } else {
      alert("알림 삭제 처리가 취소되었습니다");
    }
  };

  return (
    <>
        <SidebarContainer isOpen={isSidebarOpen}>
          <Direction onClick={hideChangeHandler}>
            <FontAwesomeIcon icon={faLeftLong} />
          </Direction>
          <List onClick={(e) => e.preventDefault()}>
            <ListItem onClick={() => navigate("/")}>
              <img src={process.env.PUBLIC_URL + "/img/home.png"} alt="홈" />홈
              화면
            </ListItem>
            <ListItem>
              <img
                src={process.env.PUBLIC_URL + "/img/project.png"}
                alt="프로젝트"
              />
              공개된 프로젝트
            </ListItem>
            <hr />
            <ListItem>알림</ListItem>
            <hr />
            <ListItem
              onClick={() => {
                console.log("hi");
                navigate("/notification");
              }}
              onContextMenu={onContextMenuHandler}
              isMenuItemHovered={isMenuItemHovered}
            >
              개인 알림
              <NotificationCount>
                {notificationCount >= 99 ? `+99` : notificationCount}
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
            </ListItem>
            <ListItem onClick={() => navigate("/notification/projects")}>
              프로젝트 알림
            </ListItem>
          </List>
        </SidebarContainer>
      {
        isSidebarOpen ? null : <ExpandArrow hideChangeHandler={hideChangeHandler}></ExpandArrow>
      }
    </>
  );
}

export default SideBar;
