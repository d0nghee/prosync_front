import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5em;
  width: 94rem;
  margin-bottom: -0.5%;
  position: relative;
  border-bottom: 1px solid black;
  color: blueviolet;
  box-shadow: 5px 5px 5px black;
  font-weight: 900;
  border: #707070;
  font-size: larger;
  text-align: center;

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

  & > label {
    margin-right: 3%;
    
  }

  & > div:nth-child(3) {
    position: absolute;
    left: -4rem;
    top: 2.2rem;
    width: 20%;
  }

  & > div:nth-child(4) {
    position: absolute;
    left: 7rem;
    top: 2.2rem;
    width: 20%;
  }

  & > div:nth-child(5) {
    position: absolute;
    left: 30rem;
    top: 2.2rem;
    width: 20%;
  }

  & > div:nth-child(6) {
    position: absolute;
    right: 6rem;
    width: 20%;
    top: 2.2rem;
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

const NotificationTitle = () => {
  return (
    <TitleContainer>
      <input
        type="checkbox"
        id={`checkbox`}
        //   checked={isChecked}
        //   onClick={checkBoxHandler}
      />
      <label
        htmlFor={`checkbox`}
        //   onClick={labelClickHandler}
      ></label>
      <div>상태</div>
      <div>코드</div>
      <div>알림내용</div>
      <div>생성날짜</div>
    </TitleContainer>
  );
};

export default NotificationTitle;
