import styled from 'styled-components'


export const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 80%;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const RedButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: red;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;
`;

export const BlueButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;
`;

export const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;

  &.modal-button-red {
    background-color: red;
  }

  &:hover {
    background-color: gainsboro;
  }
`;