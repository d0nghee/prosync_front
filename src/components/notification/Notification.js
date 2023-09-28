import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { patchApi } from "../../util/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faBell } from "@fortawesome/free-solid-svg-icons";

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
  background-color: ${(props) => (!props.read ? "#e8efed" : null)};
  font-weight: ${(props) => (!props.read ? "900" : 200)};
  color: ${(props) => (!props.read ? "black" : "gray")};
  text-align: center;
  position: relative;

  & input[type="checkbox"] {
    display: none;
  }

  & input[type="checkbox"] + label {
    display: inline-block;
    width: 2%;
    height: 60%;
    border: 3px solid #707070;
    cursor: pointer;
  }

  & input[type="checkbox"]:checked + label::after {
    content: "✔";
    color: blue;
    font-size: 23px;
    width: 2%;
    height: 60%;
    text-align: center;
    left: 0;
    top: 0;
  }

  & > label {
    margin-right: 3%;
  }

  & > div:nth-child(5) {
    position: relative;
    width: 60%;
    text-align: start;
    height: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div:nth-child(5):hover {
    font-weight: 900;
    text-decoration: underline;
    color: black;
  }

  & > div:nth-child(7) {
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
  const [isChecked, setIsChecked] = useState(false);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  

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

  const handleMoveUrl = useCallback(() => {
    if (notification.read === false) {
      (async () => {
        await patchApi(
          `/notification/${notification.notificationTargetId}/read`
        );
      })();
      console.log("읽음처리 완료");
    }

    navigate(notification.url);
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
      <label
        htmlFor={`checkbox-${notification.notificationTargetId}`}
        onClick={labelClickHandler}
      ></label>
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
