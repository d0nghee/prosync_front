import React, { useState } from 'react';
import styled from 'styled-components';

// TODO: 메뉴 밖 누르면 자동으로 닫히기
export default function ProjectFilterBar({
  onBookmarkFilter,
  onendDateSorting,
  onDefault,
  onlatestSorting,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState('최신 순 ');
  return (
    <DropdownContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>{menu}</MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem
            onClick={() => {
              onDefault();
              setMenu('최신 순');
            }}
          >
            최신 순
          </MenuItem>
          <MenuItem
            onClick={() => {
              onBookmarkFilter();
              setMenu('내 북마크');
            }}
          >
            내 북마크
          </MenuItem>
          <MenuItem
            onClick={() => {
              onendDateSorting();
              setMenu('마감일 임박 순');
            }}
          >
            마감일 임박 순
          </MenuItem>
          <MenuItem
            onClick={() => {
              onlatestSorting();
              setMenu('최신 순');
            }}
          >
            최신 순
          </MenuItem>
        </MenuList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`;

const MenuList = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100%;
  left: 0;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f1f1f1;
  }
`;
