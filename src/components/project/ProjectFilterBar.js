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
  return (
    <DropdownContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>Menu</MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem
            onClick={() => {
              console.log('defaultProjectListHandler is called');
              onDefault();
            }}
          >
            기본
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('onBookmarkFilter is called');
              onBookmarkFilter();
            }}
          >
            내 북마크
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('projectSortingHandler is called');
              onendDateSorting();
            }}
          >
            마감일 임박 순
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('onlatestSorting is called');
              onlatestSorting();
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
