import styled from 'styled-components';
import clipboard from '../../assets/images/clipboard.png';

function InviteModal({ isOpen, onClose, inviteLink }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalLink>{inviteLink}</ModalLink>
          <ButtonGroup>
            <CopyButton onClick={handleCopy}>
              <img src={clipboard} alt="Clipboard" />
            </CopyButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonGroup>
        </ModalHeader>
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 1000px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ModalLink = styled.h2`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;

const CloseButton = styled.button`
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export default InviteModal;
