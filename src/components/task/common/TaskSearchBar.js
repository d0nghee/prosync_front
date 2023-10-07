import React from "react";
import styled from "styled-components";

export default function TaskSearchBar({ updateSearch, onChangePage }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateSearch(event.target.value);
      onChangePage(1);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요."
        aria-label="검색어 입력"
        onKeyUp={handleKeyPress}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  width: 80%;
`;

const SearchInput = styled.input`
  height: 60px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 1.2rem;
  width: 100%;
  outline: none;
`;
