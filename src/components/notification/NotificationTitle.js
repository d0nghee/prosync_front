import React, { useState } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5rem;
  width: 100%;
  margin-bottom: -0.5%;
  border-bottom: 1px solid black;
  box-shadow: 2px 2px 2px gray;
  font-weight: 900;
  border: #707070;
  font-size: larger;
  text-align: center;

  
  input {
    width: 30px;
    height: 30px;
    padding: 0;
  }
  

  & > div:nth-child(2) {
    margin-left: 2%;
    width: 3%;
  }

  & > div:nth-child(3) {
    width: 15%;
    margin-left: 2%;
  }

  & > div:nth-child(4) {
    width: 20%;
    margin-left: 10%;
  }

  & > div:nth-child(5) {
    width: 10%;
    margin-left: 30%;
    text-align: right;
  }

  
`;

const NotificationTitle = ({
  onAllCheckHandler
}) => {
  const [isChecked, setIsChecked] = useState(false);


  

  const checkBoxHandler = (e) => {
    e.stopPropagation();

    console.log("전체박스 선택");
    setIsChecked((prevState) => {
      const newCheckedState = !prevState;
      if (!onAllCheckHandler(newCheckedState)) {return prevState};
      return newCheckedState;
    });
  };

  const labelClickHandler = (e) => {
    e.stopPropagation();
    console.log("전체박스 선택");
  };

  

  return (
    <TitleContainer>
      <input
        type="checkbox"
        id={`checkbox`}
        checked={isChecked}
        onChange={checkBoxHandler}
      />
      <div>상태</div>
      <div>코드</div>
      <div>알림내용</div>
      <div>생성날짜</div>
    </TitleContainer>
  );
};

export default NotificationTitle;
