import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagesToShow = 5;
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const groupNumber = Math.ceil(currentPage / pagesToShow);
    setStartPage((groupNumber - 1) * pagesToShow + 1);
  }, [currentPage]);

  let endPage = startPage + pagesToShow - 1;
  if (endPage > totalPages) endPage = totalPages;

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => i + startPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </ArrowButton>
      {pages.map((page) => (
        <PageNumber
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <ArrowButton onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </ArrowButton>
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

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
