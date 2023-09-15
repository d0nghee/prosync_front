import React, { useState,useCallback } from 'react'
import Notification from './Notification';
import styled from 'styled-components';
import Modal from './Modal';
import { deleteApi, patchApi } from '../../util/api';
import { json } from 'react-router';
import NotificationTitle from './NotificationTitle';

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

const UpdateButton = styled.button`
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

const DeleteButton = styled(UpdateButton)``;

const NotificationList = ({notiPageList, onConditionChangeHandler}) => {
  const [selectedTargetIds, setSelectedTargetIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOrDelete, setisUpdateOrDelete] = useState('');


  const handleCheckboxChange = useCallback((id, isChecked) => {
    if (isChecked) {
      setSelectedTargetIds(prevIds => [...prevIds, id]);
    } else {
      setSelectedTargetIds(prevIds => prevIds.filter(item => item !==id));

    }
  },[]);


  const notiUpdateHandler = useCallback((isUpdateOrDelete) => {
    if (selectedTargetIds.length==0) {
      alert("0개의 알림을 선택하셨습니다. 1개 이상의 알림을 선택해주세요.");
      setIsModalOpen(false);
    }

    console.log(selectedTargetIds);

    if (isUpdateOrDelete==='UPDATE') {

      patchApi('/notification/read', {
        notificationTargetIds: selectedTargetIds,
    }).then((response) => {

      console.log("update :");
      console.log(response);
      if (response && response.status === 200) {
        setIsModalOpen(false);
        
        const postSearchCondition = {
          notiCode: '',
          startDate: '',
          endDate: '',
          content: '',
          size: '',
          page: '',
        };
    
        onConditionChangeHandler(postSearchCondition);

      } 
    }).catch((error) => {
      throw json(
        { status: error.response.status },
        { message: error.response.data.resultCode }
      );
    })

    } else if (isUpdateOrDelete==='DELETE') {

      deleteApi('/notification/delete', {
        data: {
          notificationTargetIds: selectedTargetIds
        }
    }).then((response) => {

      console.log("delete :");
      console.log(response);
      if (response && response.status === 200) {
        setIsModalOpen(false);
        
        const postSearchCondition = {
          notiCode: '',
          startDate: '',
          endDate: '',
          content: '',
          size: '',
          page: '',
        };
    
        onConditionChangeHandler(postSearchCondition);

      } 
    }).catch((error) => {
      throw json(
        { status: error.response.status },
        { message: error.response.data.resultCode }
      );
    })

    }
  
  })

  return (
    <Container>
    <NotificationTitle/>
    { notiPageList.length > 0 && (
      notiPageList.map((notification,index) => <Notification key={index} notification={notification} onCheckboxChange={handleCheckboxChange}/>)
    )}
    { notiPageList.length === 0 && (
      <NoData>
        <h2>알림이 존재하지 않습니다!</h2>
      </NoData>
    )}
      <UpdateButton onClick={() => {setIsModalOpen(true); setisUpdateOrDelete('UPDATE')}}>선택읽음</UpdateButton>
      <DeleteButton onClick={() => {setIsModalOpen(true); setisUpdateOrDelete('DELETE')}}>선택삭제</DeleteButton>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} notiUpdateHandler={() => notiUpdateHandler(isUpdateOrDelete)} isUpdateOrDelete={isUpdateOrDelete}/>}
    </Container>
  )
}

export default NotificationList;
