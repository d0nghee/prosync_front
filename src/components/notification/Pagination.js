import React from "react";
import styled from "styled-components";
import { useState } from "react";

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
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: gray;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5%;
  margin-right: 5%;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    color: #b0b0b0;
  }

  &[border="true"] {
    background-color: #e0e0e0;
    color: #007bff;
    border: none;
    border-radius: 5px;
    color: #b0b0b0;
    font-size: 16px;

    &:hover {
      background-color: #e6f0fa;
      color: black;
      font-weight: 700;
      border: 1px solid black;
    }
  }

  &[aria-current="page"] {
    background-color: gray;
    color: white;
    font-weight: 700;
    border: 0px;
  }
`;

function Pagination({
  pageInfo,
  pageCount,
  searchCondition,
  onConditionChangeHandler,
}) {
  console.log("Pagination");
  console.log(pageInfo);

  const { page, totalPages } = pageInfo;

  const [currPage, setCurrPage] = useState(page);
  const firstNum = currPage - ((currPage - 1) % pageCount);
  const lastNum = Math.min(firstNum + pageCount - 1, totalPages);

  const changePage = (newPage) => {
    setCurrPage(newPage);
    onConditionChangeHandler({ ...searchCondition, page: newPage });
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
