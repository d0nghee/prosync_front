import React from "react";
import { useRef } from "react";
import { useCallback } from "react";
import styled from "styled-components";


const checkDateValidation = (startDate, endDate) => {
    console.log(startDate);
    console.log(endDate);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (start>=end) {
        alert('잘못된 날짜를 기입하셨습니다. 해당 날짜의 00:00:00 시간 기준입니다. 다시 선택하세요.');
        return false;
      }
    }

    return true;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: gray;
  border-radius: 10px;
  color: white;
  max-width: 1500px;
  margin-left : 15%;
  margin-right : 15%;

  & > p {
    padding: 2%;
    font-weight: 700;
  }

  & select {
    color: black;
  }

  & div {
    text-align: center;
  }

  & input {
    padding: 2%;
    border: 1px solid black;
    border-radius: 10px;
    color: black;
  }

  & input:hover {
    padding: 2%;
    border: 1px solid wheat;
    background-color: whitesmoke;
  }

  & button {
    background-color: black;
    color: white;
    width: 4rem;
    border-radius: 10px;
  }

  & button:hover {
    color: wheat;
  }
`;

const NotificationSearchBar = ({ onConditionChangeHandler }) => {
  const notiCode = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const content = useRef();
  const size = useRef();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!checkDateValidation(startDate.current.value,endDate.current.value)) {
      return;
    }


    const postSearchCondition = {
      notiCode: notiCode.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      content: content.current.value,
      size: size.current.value,
      page: '',
    };

    onConditionChangeHandler(postSearchCondition);

  }, []);

  return (
    <StyledForm method="post" onSubmit={handleSubmit}>
      <p>
        <div>알림 코드</div>
        <select name="option" ref={notiCode}>
          <option value="" disabled selected>
            원하시는 알림 정보를 선택하세요.
          </option>
          <option value="">전체</option>
          <option value="TASK_REMOVE">업무삭제</option>
          <option value="TASK_ASSIGNMENT">업무지정</option>
          <option value="TASK_MODIFICATION">업무수정</option>
          <option value="TASK_EXCLUDED">업무제외</option>
          <option value="PROJECT_ASSIGNMENT">프로젝트지정</option>
          <option value="PROJECT_EXCLUDED">프로젝트제외</option>
          <option value="PROJECT_MODIFICATION">프로젝트수정</option>
          <option value="PROJECT_REMOVE">프로젝트삭제</option>
          <option value="COMMENT_ADD">댓글추가</option>
          <option value="COMMENT_REMOVE">댓글삭제</option>
          <option value="COMMENT_MODIFICATION">댓글수정</option>
          <option value="CHANGE_AUTHORITY">권한변경</option>
        </select>
      </p>
      <p>
        <div>시작 날짜</div>
        <input type="date" ref={startDate} />
      </p>
      <p>
        <div>끝 날짜</div>
        <input type="date" ref={endDate} />
      </p>
      <p>
        <div>내용</div>
        <input type="text" ref={content} />
      </p>
      <p>
        <div>페이지 사이즈</div>
        <input type="text" ref={size} />
      </p>
      <p>
        <button>검색</button>
      </p>
    </StyledForm>
  );
};

export default NotificationSearchBar;
