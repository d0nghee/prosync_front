import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patchApi } from "../../util/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faBell } from "@fortawesome/free-solid-svg-icons";
import { tryFunc } from "../../util/tryFunc";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { useDispatch } from "react-redux";

const selectColor = (code) => {
  const array = [
    "red",
    "palegreen",
    "green",
    "blue",
    "wheat",
    "black",
    "gray",
    "orange",
    "purple",
    "blueviolet",
    "cadetblue",
    "darkgoldenrod",
    "pink",
  ];

  return code === "TASK_REMOVE"
    ? array[0]
    : code === "TASK_ASSIGNMENT"
    ? array[1]
    : code === "TASK_MODIFICATION"
    ? array[2]
    : code === "TASK_EXCLUDED"
    ? array[3]
    : code === "PROJECT_ASSIGNMENT"
    ? array[4]
    : code === "PROJECT_EXCLUDED"
    ? array[5]
    : code === "PROJECT_MODIFICATION"
    ? array[6]
    : code === "PROJECT_REMOVE"
    ? array[7]
    : code === "COMMENT_ADD"
    ? array[8]
    : code === "COMMENT_REMOVE"
    ? array[9]
    : code === "COMMENT_MODIFICATION"
    ? array[10]
    : code === "CHANGE_AUTHORITY"
    ? array[11]
    : code == "PROJECT_EXIT"
    ? array[12]
    : null;
};

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3rem;
  width: 100%;
  margin-bottom: -0.5%;
  cursor: pointer;
  border-bottom: 1px solid gray;
  background-color: ${(props) => (!props.read ? "#f5f5f5" : null)};
  font-weight: ${(props) => (!props.read ? "900" : 200)};
  color: ${(props) => (!props.read ? "black" : "gray")};
  text-align: center;
  position: relative;

  input {
    width: 30px;
    height: 30px;
    padding: 0;
  }

  & > *:nth-child(2) {
    margin-left: 3%;
    width: 2rem;
  }

  

  & > div:nth-child(4) {
    position: relative;
    width: 60%;
    text-align: start;
    height: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div:nth-child(4):hover {
    font-weight: 900;
    text-decoration: underline;
    color: black;
  }

  & > div:nth-child(6) {
    width: 20%;
    height: 60%;
  }
`;

const Tooltip = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  top: -130%;
  left: 40%;
  background-color: #f9f9f9;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  z-index: 1000;
  color: black;
  font-weight: 900;
  max-width: 70rem;
  white-space: normal;
  text-align: start;

`;

const Code = styled.div`
  background-color: ${(props) => props.color};
  padding: 0.5%;
  color: white;
  font-weight: 800;
  border-radius: 10px;
  width: 18%;
  text-align: center;
  height: 80%;
  margin-left: 5%;
  margin-right: 11%;
`;

const Notification = ({ checked, notification, onCheckboxChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.offsetWidth < element.scrollWidth);
    }
  }, [notification.content]);

  const handleMouseEnter = () => {
    if (isOverflowing) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (isOverflowing) {
      setShowTooltip(false);
    }
  };

  const checkBoxHandler = (e) => {
    e.stopPropagation();

    setIsChecked((prevState) => {
      const newCheckedState = !prevState;
      onCheckboxChange(notification.notificationTargetId, newCheckedState);
      return newCheckedState;
    });
  };

  const color = selectColor(notification.code);

  const markNotificationRead = async () => {
    const response = await patchApi(
      `/notification/${notification.notificationTargetId}/read`
    );
    return response;
  }

  const onMarkReadSuccess = () => {
    console.log('읽음 처리 완료');
    navigate(notification.url);
  }
  
  const onMarkReadError = {
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (error) => {
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      setIsLoggedIn(false);
      navigate(
        `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
      );
    },
    403: (error) => {
      console.log(error.response.status);
      alert("해당 알림을 읽을 수 없습니다. 본인의 알림이 맞는지 확인하세요.");
      
    },
    404: (error) => {
      console.log(error.response.status);
      alert("해당 알림을 찾을 수 없습니다.");
     
    },
    default: (error) => {
      console.error("Unknown error:", error);
      alert("알림 읽음 처리 중 오류가 발생하였습니다.");
    },
  }

  const handleMoveUrl = useCallback(() => {
    if (notification.read === false) {
      // tryFunc(markNotificationRead, onMarkReadSuccess, onMarkReadError)();
      tryFunc(markNotificationRead, onMarkReadSuccess, dispatch)();
    } else {
      navigate(notification.url);
    }
  }, []);

  const labelClickHandler = useCallback((e) => {
    e.stopPropagation();
  });

  return (
    <NotificationContainer onClick={handleMoveUrl} read={notification.read}>
      <input
        type="checkbox"
        id={`checkbox-${notification.notificationTargetId}`}
        checked={isChecked}
        onChange={checkBoxHandler}
        onClick={(e) => e.stopPropagation()}
      />
      {notification.read ? (
        <FontAwesomeIcon icon={faBellSlash} />
      ) : (
        <FontAwesomeIcon icon={faBell} />
      )}
      <Code color={color}>{notification.code}</Code>
      <div
        ref={textRef}
        data-content={notification.content}
        onMouseEnter={isOverflowing ? handleMouseEnter : null}
        onMouseLeave={isOverflowing ? handleMouseLeave : null}
      >
        {notification.content}
      </div>
      <Tooltip show={showTooltip}>{notification.content}</Tooltip>
      <div>{notification.createdAt}</div>
    </NotificationContainer>
  );
};

export default Notification;
