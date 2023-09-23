import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const ExpandArrowWrapper = styled.div`
  width: 3rem;
  height: 8vh;
  position: fixed;
  left: 0;
  top: 40vh;
  padding: 25px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid gray;
  border-left: 0;
  transition: background-color 0.3s; 


  & :hover {
    transform: scale(1.1);
    background-color: #e9ecef;
  }

  & > * {
    position: absolute;
    left: 20%;
    top: 30%;
    transition: transform 0.3s;
  }
`;

const ExpandArrow = ({ hideChangeHandler }) => {
  return (
    <ExpandArrowWrapper onClick={hideChangeHandler}>
      <FontAwesomeIcon icon={faRightToBracket} size='2x'/>
    </ExpandArrowWrapper>
  );
};

export default ExpandArrow;
