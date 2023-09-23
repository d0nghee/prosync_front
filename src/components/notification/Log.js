import {React, useCallback} from "react";
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
  background-color: ${(props) => (!props.read ? "#FDF5E6" : null)};
  font-weight: ${(props) => (!props.read ? "900" : 200)};
  color: ${(props) => (!props.read ? "black" : "gray")};

  &:hover {
    background-color: wheat;
    box-shadow: 5px 5px 5px;
  }


  & > div:nth-child(2) {
    position: absolute;
    left: 30%;
    top: 20%;
    width: 60%;
  }

  & > div:nth-child(3) {
    position: absolute;
    left: 80%;
    top: 20%;
    width: 20%;
  }

`;

const Code = styled.div`
  background-color: ${(props) => props.color};
  padding: 0.5%;
  color: white;
  font-weight: 800;
  font-size: smaller;
  border-radius: 10px;
  width: 16%;
  text-align: center;
  position: absolute;
  height: 80%;
  padding-top: 1%;
`;


const Log = ({ log }) => {
  const { content, code, createdAt, url } = log;
  const color = selectColor(code);
  const navigate = useNavigate();

  const handleMoveUrl = useCallback(() => {
    navigate(url);
  }, []);

  return (
    <LogContainer onClick={handleMoveUrl}>
      <Code color={color}>{code}</Code>
      <div>{content}</div>
      <div>{createdAt}</div>
    </LogContainer>
  );
};

export default Log;
