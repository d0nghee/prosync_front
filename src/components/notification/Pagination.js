import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const PageContainer = styled.div`
  margin-left: 25%;
  margin-top: 5%;
  width: 50%;
  margin-bottom: 2%;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  width: 80px;
  padding: 10px 10px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 1rem;
  cursor: pointer;
  color: #be95c4;
  background-color: white;
  border: 0px;

  &:hover {
    background-color:  #be95c4;
    opacity: 0.7;
    color: white;

  }

  &:disabled {
    cursor: not-allowed;
    color: #b0b0b0;
  }

  &:disabled:hover {
   background-color: white;
  }




  &[border="true"] {
    background-color: white;
    color: #007bff;
    border: none;
    border-radius: 1rem;
    color: #b0b0b0;
    font-size: 1.5rem;
    padding: 10px 10px;

    &:hover {
      opacity: 0.7;
      background-color: #be95c4;
      color: white;
    }
  }

  &[aria-current="page"] {
    border: 3px solid #be95c4
    
  }
`;

function Pagination({ pageInfo, pageCount, isPersonal }) {
  const { page, totalPages } = pageInfo;

  const [currPage, setCurrPage] = useState(page);
  const firstNum = currPage - ((currPage - 1) % pageCount);
  const lastNum = Math.min(firstNum + pageCount - 1, totalPages);
  const navigate = useNavigate();
  const location = useLocation();

  const changePage = (newPage) => {
    setCurrPage(newPage);

    const queryParams = new URLSearchParams(location.search);

    queryParams.set("page", newPage);

    // useNavigate 사용하기
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const createButtons = () => {
    let buttons = [];
    for (let i = firstNum; i <= lastNum; i++) {
      buttons.push(
        <Button
          border="true"
          key={i}
          onClick={() => changePage(i)}
          aria-current={page === i ? "page" : null}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <PageContainer>
      <ButtonWrap>
        <Button onClick={() => changePage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {createButtons()}
        <Button
          onClick={() => changePage(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </Button>
      </ButtonWrap>
    </PageContainer>
  );
}

export default Pagination;
