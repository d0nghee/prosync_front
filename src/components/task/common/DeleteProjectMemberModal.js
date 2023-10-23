import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

function DeleteProjectMemberModal({ isOpen, onClose, onDelete }) {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (inputValue === "나가기") {
      onDelete();
      onClose();
    } else {
      alert("정확한 텍스트를 입력해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <h2>정말로 해당 프로젝트에서 나가시겠습니까?</h2>
        <p>
          해당 프로젝트를 나가시려면 <b>[나가기]</b>를 입력하세요.
        </p>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="나가기"
        />
        <ButtonGroup>
          <DeleteButton onClick={handleDelete}>완료</DeleteButton>
          <CloseButton onClick={onClose}>취소</CloseButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const DeleteButton = styled.button`
  padding: 15px 30px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c0392b;
  }
`;

const CloseButton = styled.button`
  padding: 15px 30px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export default DeleteProjectMemberModal;
