import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  margin-top: 0%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 33rem;
  padding: 3rem;
  padding-top: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  & > h2 {
    font-weight: 900;
    font-size: 1.5rem;
    margin-top: 0.5%;
    text-align: center;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 4rem;
    margin-top: 1.5rem;
  }

  & >div :nth-child(1) {
    background-color: blue;
    padding: 0.5rem;
    border-radius: 10px;
    width: 30%;
    height: 4rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }

  & >div :nth-child(2) {
    background-color: red;
    padding: 0.5rem;
    border-radius: 10px;
    width: 30%;
    height: 4rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    
  }

  & >div :nth-child(1):hover {
    background-color: #ff6b6b;
    color: #e60000;  
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
    transform: scale(1.1); 
    cursor: pointer;
  }

  & >div :nth-child(2):hover {
    background-color: #6bb2ff; 
    color: #0055ff;  
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);  
    transform: scale(1.1); 
    cursor: pointer;
  }
`;

const Modal = ({ onClose, notiUpdateHandler,isUpdateOrDelete }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {isUpdateOrDelete==='UPDATE' ? <h2>해당 알림들을 읽음처리하시겠습니까?</h2> : isUpdateOrDelete==='DELETE' ? <h2>해당 알림들을 삭제하시겠습니까?</h2> : <h2>알림을 모두 삭제하시겠습니까?</h2> }
        <div>
          <button onClick={onClose}>No</button>
          <button onClick={notiUpdateHandler}>Yes</button>
        </div>
      </ModalBox>
    </Overlay>
  );
};

export default Modal;
