import { React, useCallback, useRef, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

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

const LogContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3rem;
  width: 100%;
  margin-bottom: -0.5%;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid gray;
  font-weight: 900;
  color: black;

  &:hover {
    background-color: #f4f3ee;
  }

  & > div:nth-child(2) {
    position: absolute;
    left: 30%;
    top: 20%;
    width: 40%;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 0.3%;
  }

  & > div:nth-child(2):hover {
    font-weight: 900;
    text-decoration: underline;
  }

  & > div:nth-child(4) {
    position: absolute;
    left: 80%;
    top: 20%;
    width: 20%;
    padding-top: 0.3%;

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
  font-size: 1rem;
  border-radius: 10px;
  width: 20%;
  text-align: center;
  position: absolute;
  height: 80%;
  padding-top: 0.7%;
`;

const Log = ({ log }) => {
  const { content, code, createdAt, url } = log;
  const color = selectColor(code);
  const navigate = useNavigate();
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.offsetWidth < element.scrollWidth);
    }
  }, [content]);

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

  const handleMoveUrl = useCallback(() => {
    navigate(url);
  }, []);

  return (
    <LogContainer onClick={handleMoveUrl}>
      <Code color={color}>{code}</Code>
      <div
        ref={textRef}
        data-content={content}
        onMouseEnter={isOverflowing ? handleMouseEnter : null}
        onMouseLeave={isOverflowing ? handleMouseLeave : null}
      >
        {content}
      </div>
      <Tooltip show={showTooltip}>{content}</Tooltip>
      <div>{createdAt}</div>
    </LogContainer>
  );
};

export default Log;
