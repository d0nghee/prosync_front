import { useState } from 'react';
import styled from 'styled-components';

export default function ProjectMemberSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <SearchBarContainer>
      <StyledInput
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;
