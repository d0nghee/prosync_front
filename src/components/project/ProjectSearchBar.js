import React, { useState } from 'react';
import styled from 'styled-components';

export default function ProjectSearchBar({ onSearch, padding, margin}) {
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
        style={projectStyle}
        onKeyPress={onKeyPress}
      />
      <SearchButton onClick={handleSubmit}>Search</SearchButton>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  width: 100%;
  margin: 20px;
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
