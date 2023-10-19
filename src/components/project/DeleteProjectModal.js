import React, { useState } from 'react';
import styled from 'styled-components';

function DeleteProjectModal({ isOpen, onClose, onDelete }) {
  const [inputValue, setInputValue] = useState('');

  const handleDelete = () => {
    if (inputValue === '프로젝트 삭제') {
      onDelete();
      onClose();
    } else {
      alert('정확한 텍스트를 입력해주세요.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>정말로 프로젝트를 삭제하시겠습니까?</h2>
        <p>프로젝트 삭제를 확정하려면 '프로젝트 삭제'라고 입력해주세요.</p>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="프로젝트 삭제"
        />
        <ButtonGroup>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <CloseButton onClick={onClose}>취소</CloseButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export default DeleteProjectModal;
