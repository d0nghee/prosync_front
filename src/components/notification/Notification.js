import React from "react";
import styled from "styled-components";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { patchApi } from "../../util/api";

const arrayToTimeFormat = (array) => {
  const formattedDate = `${array[0]}-${String(array[1]).padStart(
    2,
    "0"
  )}-${String(array[2]).padStart(2, "0")} ${String(array[3]).padStart(
    2,
    "0"
  )}:${String(array[4]).padStart(2, "0")}:${String(array[5]).padStart(2, "0")}`;
  return formattedDate;
};

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
  margin-bottom: -0.5%;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: wheat;
    box-shadow: 5px 5px 5px;
  }

  & input[type="checkbox"] {
    display: none;
  }

  & input[type="checkbox"] + label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 3px solid #707070;
    position: relative;
    cursor: pointer;
  }

  & input[type="checkbox"]:checked + label::after {
    content: "✔";
    color: blue;
    font-size: 25px;
    width: 30px;
    height: 30px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }

  & > div:nth-child(4) {
    position: absolute;
    left: 30rem;
    top: 0.7rem;
    width: 60%;
    font-weight: 800;
  }

  & > div:nth-child(5) {
    position: absolute;
    right: 1rem;
    width: 20%;
    top: 0.7rem;
    font-weight: 800;
  }
`;

const Code = styled.div`
  background-color: ${(props) => props.color};
  padding: 0.5%;
  color: white;
  font-weight: 800;
  border-radius: 10px;
  width: 13%;
  text-align: center;
  position: absolute;
  left: 10rem;
  height: 80%;
`;

const Notification = ({ notification, onCheckboxChange }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

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
    <NotificationContainer onClick={handleMoveUrl}>
      <input
        type="checkbox"
        id={`checkbox-${notification.notificationTargetId}`}
        checked={isChecked}
        onClick={checkBoxHandler}
      />
      <label
        htmlFor={`checkbox-${notification.notificationTargetId}`}
        onClick={labelClickHandler}
      ></label>
      <Code color={color}>{notification.code}</Code>
      <div>{notification.content}</div>
      <div>{arrayToTimeFormat(notification.createdAt)}</div>
    </NotificationContainer>
  );
};

export default Notification;
