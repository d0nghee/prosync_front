import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  faMagnifyingGlass,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const checkDateValidation = (startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert(
        "잘못된 날짜를 기입하셨습니다. 해당 날짜의 00:00:00 시간 기준입니다. 다시 선택하세요."
      );
      return false;
    }
  }

  return true;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: gray;
  border-radius: 10px;
  border: 3px solid black;
  width: 100%;
  height: 20rem;
  position: absolute;
  left: 0%;
  top: 120%;
  z-index: 1000;
  text-align: center;
  padding: 1.5%;

  & > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 15%;
    border: 1px solid black;
  }

  & > div > div {
    width: 25%;
  }
`;

const Container = styled.div`
  width: 30%;
  position: absolute;
  left: 70%;
  height: 130%;
  border-radius: 20px;
  background-color: #e6ebf6;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const BarWrap = styled.div`
  display: flex;
  width: 100%;
`;
const Bar = styled.div`
  width: 80%;

  & > input {
    width: 80%;
    border: 0px;
    background-color: #e6ebf6;
    height: 100%;
    font-size: large;
    font-weight: 800;
  }

  & > :nth-child(2) {
    cursor: pointer;
  }

  & > :nth-child(2):hover {
    color: green;
  }

  & > input:focus {
    outline: none;
  }
`;

const DetailButton = styled.div`
  display: flex;
  width: 20%;
  align-items: center;

  & > :nth-child(2) {
    margin-left: 8%;
    cursor: pointer;
  }
`;

const SearchBar = ({ isPersonal, codeInformation }) => {
  const [content, setContent] = useState('');
  const [searchCondition, setSearchCondition] = useState({
    code: '',
    startDate: '',
    endDate: '',
    formContent: '',
    size: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  useEffect(() => {
    const hideFormMenu = (e) => {
      if (isFormOpen) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", hideFormMenu);

    return () => {
      document.removeEventListener("mousedown", hideFormMenu);
    };
  }, [isFormOpen]);

 

  const handleContentSubmit = useCallback(async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    console.log('content')
    console.log(content);

    if (content) {
      queryParams.set("content", content);
    }

    navigate(`${location.pathname}?${queryParams}`);
  }, [content]);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    

    if (!checkDateValidation(searchCondition.startDate, searchCondition.endDate)) {
      return;
    }

    if (searchCondition.code) {
      queryParams.set("code", searchCondition.code);
    }

    if (searchCondition.startDate) {
      queryParams.set("startDate", searchCondition.startDate);
    }

    if (searchCondition.endDate) {
      queryParams.set("endDate", searchCondition.endDate);
    }

    if (searchCondition.formContent) {
      queryParams.set("content", searchCondition.formContent);
    }

    if (searchCondition.size) {
      queryParams.set("size", searchCondition.size);
    }

   

    navigate(`${location.pathname}?${queryParams.toString()}`);
    setIsFormOpen(false);
    setContent('');
  }, [searchCondition]);

  const onFormOpenChangeHandler = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  return (
    <Container>
      <BarWrap>
        <Bar>
          <input
            type="text"
            placeholder="내용 검색"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleContentSubmit}
          />
        </Bar>
        <DetailButton>
          <div>상세</div>
          {isFormOpen ? (
            <FontAwesomeIcon
              icon={faCaretUp}
              onClick={onFormOpenChangeHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              onClick={onFormOpenChangeHandler}
            />
          )}
        </DetailButton>
      </BarWrap>
      {isFormOpen ? (
        <StyledForm
          method="post"
          onSubmit={handleFormSubmit}
          isPersonal={isPersonal}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div>
            <div>{isPersonal ? "알림 코드" : "로그 코드"}</div>
            <select name="option" value={searchCondition.code} onChange={(e) => setSearchCondition({...searchCondition, code: e.target.value})}>
              <option value="" disabled selected>
                {isPersonal
                  ? "원하시는 알림 정보를 선택하세요."
                  : "원하시는 로그 정보를 선택하세요."}
              </option>
              <option value="">전체</option>
              {codeInformation.map((code, index) => {
                return (
                  <option key={index} value={code.code}>
                    {code.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div>기간</div>
            <input type="date"  value={searchCondition.startDate} onChange={(e) => setSearchCondition({...searchCondition, startDate: e.target.value})}/>
            <input type="date" value={searchCondition.endDate} onChange={(e) => setSearchCondition({...searchCondition, endDate: e.target.value})} />
          </div>
          <div>
            <div>내용</div>
            <input type="text" placeholder="내용 검색" value={searchCondition.formContent} onChange={(e) => setSearchCondition({...searchCondition, formContent: e.target.value})}/>
          </div>
          <div>
            <div>페이지 사이즈</div>
            <input type="text" value={searchCondition.size} onChange={(e) => setSearchCondition({...searchCondition, size: e.target.value})}/>
          </div>
          <div>
            <button onClick={handleFormSubmit}>검색</button>
            <button onClick={() => {setIsFormOpen(false)}}>취소</button>
          </div>
        </StyledForm>
      ) : null}
    </Container>
  );
};

export default SearchBar;
