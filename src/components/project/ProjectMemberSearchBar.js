import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from '../../util/debounce';

export default function ProjectMemberSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const debouncedSearch = debounce(onSearch, 300);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
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
  margin-top: 50px;
  max-width: 1150px;

  padding: 8px;
  border-radius: 8px;
  background-color: #cbdfea;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
