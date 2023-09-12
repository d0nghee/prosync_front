import { styled } from "styled-components";

export default function Modal({ children, onClose }) {
  return (
    <>
      <BackDrop onClick={onClose} />
      <StatusModal open={true}>{children}</StatusModal>,
    </>
  );
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const StatusModal = styled.dialog`
  border: none;
  border-radius: 6px;
  bax-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  overflow: hidden;
  z-index: 1;
`;
