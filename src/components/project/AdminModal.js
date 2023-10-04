import styled from 'styled-components';
import ReactModal from 'react-modal';
export default function AdminModal({
  isModalOpen,
  setIsModalOpen,
  handleConfirm,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <ModalContent>
        <p>정말로 admin을 위임할거냐?</p>
        <Button onClick={handleConfirm}>확인</Button>
        <Button onClick={handleCloseModal}>취소</Button>
      </ModalContent>
    </StyledModal>
  );
}

const StyledModal = styled(ReactModal)`
  overlay: {
    backgroundcolor: rgba(0, 0, 0, 0.5);
  }
  content: {
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 300px;
    textalign: center;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    background-color: #6672fb;
    color: white;
    &:hover {
      background-color: #5b67ca;
    }
  }
  &:last-child {
    background-color: #f4f4f4;
    color: #333;
  }
`;
