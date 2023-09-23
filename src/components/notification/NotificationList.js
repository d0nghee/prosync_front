import React, { useState, useCallback, useEffect } from "react";
import Notification from "./Notification";
import styled from "styled-components";
import Modal from "./Modal";
import { deleteApi, patchApi } from "../../util/api";
import { json } from "react-router";
import NotificationTitle from "./NotificationTitle";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NoData = styled.div`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5%;
  min-height: 20rem;

  & > * {
    margin-top: 2%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1%;
  align-items: center;
  justify-content: end;

  & > button {
    background-color: black;
    color: white;
    width: 8%;
    font-weight: 700;
    height: 100%;
    border-radius: 10px;
    padding: 1rem;
    margin-left: 1%;

    &:hover {
      color: wheat;
    }
  }
`;



const NotificationList = ({ notiPageList}) => {
  const [selectedTargetIds, setSelectedTargetIds] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOrDelete, setisUpdateOrDelete] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  

  const handleCheckboxChange = useCallback((id, isChecked) => {
    if (isChecked) {
      setSelectedTargetIds((prevIds) => {const newSet = new Set(prevIds); newSet.add(id); return newSet});
    } else {
      setSelectedTargetIds((prevIds) => {const newSet = new Set(prevIds); newSet.delete(id); return newSet});
    }
  }, []);

  const notiUpdateHandler = useCallback((isUpdateOrDelete) => {

    if (isUpdateOrDelete === "ALLDELETE") {
      deleteApi("/notification/deleteAll")
        .then((response) => {
          console.log("delete :");
          console.log(response);
          if (response && response.status === 200) {
            setIsModalOpen(false);

            navigate(`${location.pathname}`);
          }
        })
        .catch((error) => {
          throw json(
            { status: error.response.status },
            { message: error.response.data.resultCode }
          );
        });
    } else {
      if (selectedTargetIds.length === 0) {
        alert("0개의 알림을 선택하셨습니다. 1개 이상의 알림을 선택해주세요.");
        setIsModalOpen(false);
      }
  
  
      if (isUpdateOrDelete === "UPDATE") {
        patchApi("/notification/read", {
          notificationTargetIds: Array.from(selectedTargetIds),
        })
          .then((response) => {
            console.log("update :");
            console.log(response);
            if (response && response.status === 200) {
              setIsModalOpen(false);
  
              navigate(`${location.pathname}?${queryParams.toString()}`)
            }
          })
          .catch((error) => {
            throw json(
              { status: error.response.status },
              { message: error.response.data.resultCode }
            );
          });
      } else if (isUpdateOrDelete === "DELETE") {
        deleteApi("/notification/delete", {
          data: {
            notificationTargetIds: Array.from(selectedTargetIds),
          },
        })
          .then((response) => {
            console.log("delete :");
            console.log(response);
            if (response && response.status === 200) {
              setIsModalOpen(false);
  
              navigate(`${location.pathname}?${queryParams.toString()}`)

            }
          })
          .catch((error) => {
            throw json(
              { status: error.response.status },
              { message: error.response.data.resultCode }
            );
          });
      }
    }

  });

  const onAllCheckHandler = (isChecked) => {

    console.log(isChecked);

    if (isChecked) {

      if (notiPageList.length===0) {
        alert('알림이 존재하지 않아 전체선택 하실 수 없습니다.');
        return false;
      }

      const selectedIds = new Set();
      notiPageList.forEach((notification) => {
        selectedIds.add(notification.notificationTargetId);
      });
      
      setSelectedTargetIds(selectedIds);
    } else {
      setSelectedTargetIds(new Set());
    }

    return true;
  }



  return (
    <Container>
      <NotificationTitle onAllCheckHandler={onAllCheckHandler} />
      {notiPageList.length > 0 &&
        notiPageList.map((notification) => (  selectedTargetIds.has(notification.notificationTargetId) ?
          <Notification
          key={notification.notificationTargetId}
          notification={notification}
          onCheckboxChange={handleCheckboxChange}
          checked={true}
        /> : <Notification
        key={notification.notificationTargetId}
        notification={notification}
        onCheckboxChange={handleCheckboxChange}
        checked={false}
      />
        
        ))}
      {notiPageList.length === 0 && (
        <NoData>
          <h2>알림이 존재하지 않습니다!</h2>
        </NoData>
      )}
      <ButtonContainer>
      <button
          onClick={() => {
            setIsModalOpen(true);
            setisUpdateOrDelete("ALLDELETE");
          }}
        >
          모두삭제
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setisUpdateOrDelete("UPDATE");
          }}
        >
          선택읽음
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setisUpdateOrDelete("DELETE");
          }}
        >
          선택삭제
        </button>
      </ButtonContainer>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          notiUpdateHandler={() => notiUpdateHandler(isUpdateOrDelete)}
          isUpdateOrDelete={isUpdateOrDelete}
        />
      )}
    </Container>
  );
};

export default NotificationList;