import React from 'react';
import styled from 'styled-components';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1); // 1부터 시작

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageNumber
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const PageNumber = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: ${(props) => (props.active ? '#007BFF' : '#FFFFFF')};
  color: ${(props) => (props.active ? '#FFFFFF' : '#000000')};
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#f0f0f0')};
  }
`;
