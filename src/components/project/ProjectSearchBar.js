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
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton onClick={handleSubmit}>Search</SearchButton>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-left: 30px;
  padding: 8px;
  border-radius: 8px;
  background-color: #cbdfea;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #55a0a2;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 0 4px 4px 0;
  &:hover {
    background-color: #467a8c;
  }
`;
