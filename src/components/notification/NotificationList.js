import React, { useState,useCallback } from 'react'
import Notification from './Notification';
import styled from 'styled-components';
import Modal from './Modal';
import { patchApi } from '../../util/api';

const NoData = styled.div`
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left : 15%;
  margin-right : 15%;
  min-height: 20rem;


  & > *:not(:last-child) {
    margin-top: 2%;
  }

 

`

const DeleteButton = styled.button`
  background-color: black;
  color: white;
  margin-left:75%;
  margin-top: 2%;
  width: 6rem;
  font-weight: 700;
  height: 4rem;
  border-radius: 10px;
  padding: 1rem;
  &:hover  {
    color: wheat;

  }
`

const NotificationList = ({notiPageList}) => {
  const [selectedTargetIds, setSelectedTargetIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = useCallback((id, isChecked) => {
    if (isChecked) {
      setSelectedTargetIds(prevIds => [...prevIds, id]);
    } else {
      setSelectedTargetIds(prevIds => prevIds.filter(item => item !==id));

    }
  },[]);


  const isReadNotiHandler = useCallback(() => {
    if (selectedTargetIds.length==0) {
      alert("0개의 알림을 선택하셨습니다. 1개 이상의 알림을 선택해주세요.");
      setIsModalOpen(false);
    }

    console.log(selectedTargetIds);

    patchApi('/notification/read', {
      
        notificationTargetIds: selectedTargetIds,
      
    })
  
  })

  return (
    <Container>
    { notiPageList.length > 0 && (
      notiPageList.map((notification,index) => <Notification key={index} notification={notification} onCheckboxChange={handleCheckboxChange}/>)
    )}
    { notiPageList.length === 0 && (
      <NoData>
        <h2>알림이 존재하지 않습니다!</h2>
      </NoData>
    )}
      <DeleteButton onClick={() => setIsModalOpen(true)}>읽음처리</DeleteButton>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} isReadNotiHandler={isReadNotiHandler}/>}
    </Container>
  )
}

export default NotificationList;