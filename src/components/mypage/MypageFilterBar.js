import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// TODO: 메뉴 밖 누르면 자동으로 닫히기
export default function MypageFilterBar({
  onBookmarkFilter,
  onendDateSorting,
  onDefault,
  currentMenu,
  setCurrentMenu,
}) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("필터");


  const menuHandler = () => {
    setIsOpen(prev => !prev);
    console.log("이즈 오픈",isOpen)
  };

  const defaultFilter = () => {
    setCurrentMenu("최신 순")
    console.log("isonpen", isOpen)
    setIsOpen(false);
    onDefault();
  };

  const bookmarkFilter = () => {
    setCurrentMenu("북마크 순")
    setIsOpen(true);
    onBookmarkFilter();
  };

  const endDateFilter = () => {
    setCurrentMenu("마감 임박 순")
    setIsOpen(true);
    onendDateSorting();
  };

  return (
    <DropdownContainer>
      <MenuButton onClick={menuHandler}>{currentMenu}</MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem onClick={defaultFilter}>최신 순</MenuItem>
          <MenuItem onClick={bookmarkFilter}>내 북마크</MenuItem>
          <MenuItem onClick={endDateFilter}>마감일 임박 순</MenuItem>
        </MenuList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 150px;
  display: inline-block;
`;

const MenuButton = styled.button`
  background-color: #55a0a2;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #467a8c;
  }
`;

const MenuList = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
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
