import React, { useState } from 'react';
import styled from 'styled-components';

export default function ProjectSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </form>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  margin-left: 200px; // ProjectGrid와 동일한 margin-left 값을 추가
  margin-right: 200px; // ProjectGrid와 동일한 margin-right 값을 추가
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  flex-grow: 1; // 이 줄을 추가하여 input이 가능한 모든 공간을 차지하도록 합니다.
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 0 4px 4px 0;
  &:hover {
    background-color: #218838;
  }
`;
