import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  faMagnifyingGlass,
  faCaretUp,
  faCaretDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "./../button/Button";

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
  background-color: white;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 0.5px 0.5px gray;
  width: 100%;
  height: 20rem;
  position: absolute;
  left: 0.5%;
  top:  120%; 
  z-index: 1000;
  padding: 1.5%;
  font-size: medium;
  font-weight: 600;
  color: black;

  & * {
    font-weight: 800;
  }


  & > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 15%;
  }

  & > .code {
    & > div {
      width: 20%;
      padding-top: 1.5%;
      padding-left: 3%;
    }

    & > select {
      width: 80%;
      border-radius: 10px;
      border: 0.05px solid gray;
      outline: none;
    }

    & > select:focus {
      border: 0.05px solid rgb(127, 185, 242);
    }
  }

  & > .period {
    & > div {
      width: 20%;
      padding-top: 1.5%;
      padding-left: 3%;
    }

    & > .period-container {
      width: 80%;
      display: flex;
      flex-direction: row;
      padding: 0%;
      justify-content: space-between;
      align-items: center;

      & > input {
        height: 100%;
        width: 45%;
        border-radius: 10px;
        border: 0.05px solid gray;
        
      }
    }
  }

  & > .content {
    & > div {
      width: 20%;
      padding-top: 1.5%;
      padding-left: 3%;
    }

    & > input {
      width: 80%;
      border-radius: 10px;
      border: 0.05px solid gray;
      outline: none;
      caret-color: rgb(127, 185, 242);
      padding-left: 2%;
    }

    & > input:focus {
      border: 0.05px solid rgb(127, 185, 242);
    }
  }

  & > .size {
    & > div {
      width: 20%;
      padding-top: 1.5%;
      padding-left: 3%;
    }

    & > input {
      width: 80%;
      border-radius: 10px;
      border: 0.05px solid gray;
      outline: none;
      caret-color: rgb(127, 185, 242);
      padding-left: 2%;
    }

    & > input:focus {
      border: 0.05px solid rgb(127, 185, 242);
    }
  }

  & > .buttons {
    width: 10%;

    & > button {
      width: 100%;
      border-radius: 10px;
      border: 0px;
      color: white;
      font-weight: 900;
      background-color: rgb(146,146,148);
      cursor: pointer;
    }
  }
`;

const Container = styled.div.attrs(props => ({
  isPersonal: props.isPersonal
}))`
  width: ${(props) => (props.isPersonal ? "35%" : "50%")};
  position: absolute;
  left: ${(props) => (props.isPersonal ? "65%" : "50%")};
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
  const [content, setContent] = useState("");
  const [searchCondition, setSearchCondition] = useState({
    code: "",
    startDate: "",
    endDate: "",
    formContent: "",
    size: "",
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

  const handleContentSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const queryParams = new URLSearchParams();
      console.log("content");
      console.log(content);

      if (content) {
        queryParams.set("content", content);
      }

      navigate(`${location.pathname}?${queryParams}`);
    },
    [location, content]
  );

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const queryParams = new URLSearchParams();

      if (
        !checkDateValidation(searchCondition.startDate, searchCondition.endDate)
      ) {
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
      setContent("");
    },
    [location, searchCondition]
  );

  const onFormOpenChangeHandler = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  return (
    <Container isPersonal={isPersonal}>
      <BarWrap>
        <Bar>
          <input
            type="text"
            placeholder="내용 검색"
            defaultValue={content}
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
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
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
          <div className="code">
            <div>{isPersonal ? "알림 코드" : "로그 코드"}</div>
            <select
              name="option"
              value={searchCondition.code}
              onChange={(e) =>
                setSearchCondition({ ...searchCondition, code: e.target.value })
              }
            >
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
          <div className="period">
            <div>기간</div>
            <div className="period-container">
              <input
                type="date"
                value={searchCondition.startDate}
                onChange={(e) =>
                  setSearchCondition({
                    ...searchCondition,
                    startDate: e.target.value,
                  })
                }
              />
              <FontAwesomeIcon icon={faMinus} />
              <input
                type="date"
                value={searchCondition.endDate}
                onChange={(e) =>
                  setSearchCondition({
                    ...searchCondition,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="content">
            <div>내용</div>
            <input
              type="text"
              placeholder="내용 검색"
              defaultValue={searchCondition.formContent}
              onChange={(e) =>
                setSearchCondition({
                  ...searchCondition,
                  formContent: e.target.value,
                })
              }
            />
          </div>
          <div className="size">
            <div>페이지 크기</div>
            <input
              type="text"
              defaultValue={searchCondition.size}
              onChange={(e) =>
                setSearchCondition({ ...searchCondition, size: e.target.value })
              }
            />
          </div>
          <div className="buttons">
            <button onClick={handleFormSubmit}>검색</button>
          </div>
        </StyledForm>
      ) : null}
    </Container>
  );
};

export default SearchBar;
