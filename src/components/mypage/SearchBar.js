import React, { useState } from 'react';
import styled from 'styled-components';

export default function SearchBar({ onSearch, padding, margin }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const projectStyle = {
    "padding" : "10px" && padding,
    "fontSize" : "16px",
    "border" : "1px solid #ccc",
    "borderRadius" : "4px 0 0 4px",
    "margin" : "20px" && margin
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <SearchButton onClick={handleSubmit}>Search</SearchButton>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  margin-left: 50px;
  border: 2px solid skyblue;
  height: 42px;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid skyblue;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
    height: 40px;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #218838;
  }
`;
