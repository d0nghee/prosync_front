import React, { useState, useCallback, useEffect } from "react";
import Notification from "./Notification";
import styled from "styled-components";
import { deleteApi, patchApi } from "../../util/api";
import NotificationTitle from "./NotificationTitle";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import { useDispatch } from "react-redux";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5%;
  min-height: 40rem;

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
    width: 100px;
    font-weight: 700;
    height: 100%;
    border-radius: 10px;
    padding: 1rem;
    margin-left: 1%;
    border: 0px;

    &:hover {
      opacity: 0.8;
    }
  }

  & > button:nth-child(1) {
    background-color: #ef233c;
  }

  & > button:nth-child(2) {
    background-color: #4361ee;
  }

  & > button:nth-child(3) {
    background-color: #ca5329;
  }

`;

const NotificationList = ({ notiPageList }) => {
  const [selectedTargetIds, setSelectedTargetIds] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const handleCheckboxChange = useCallback((id, isChecked) => {
    if (isChecked) {
      setSelectedTargetIds((prevIds) => {
        const newSet = new Set(prevIds);
        newSet.add(id);
        return newSet;
      });
    } else {
      setSelectedTargetIds((prevIds) => {
        const newSet = new Set(prevIds);
        newSet.delete(id);
        return newSet;
      });
    }
  }, []);

  const updateNoficiations = async (isUpdateOrDelete) => {
    if (isUpdateOrDelete === "ALLDELETE") {
      if (window.confirm('알림을 모두 삭제하시겠습니까?')) {
        const response = await deleteApi("/notification/deleteAll");
        return { response, isUpdateOrDelete };
      } else {
        alert('삭제 요청을 취소하셨습니다.');
      }
    } else if (isUpdateOrDelete === "UPDATE") {
      if (window.confirm(`해당 ${selectedTargetIds.size}개의 알림들을 읽음처리하시겠습니까?`)) {
        const response = await patchApi("/notification/read", {
          notificationTargetIds: Array.from(selectedTargetIds),
        });
        return { response, isUpdateOrDelete };
      } else {
        alert('읽기 요청을 취소하셨습니다.')
      }
      
    } else if (isUpdateOrDelete === "DELETE") {
      if (window.confirm(`해당 ${selectedTargetIds.size}개의 알림들을 삭제하시겠습니까?`)) {
        const response = await deleteApi("/notification/delete", {
          data: {
            notificationTargetIds: Array.from(selectedTargetIds),
          },
        });
        return { response, isUpdateOrDelete };
      } else {
        alert('삭제 요청을 취소하셨습니다.')
      }
      
    }
  };

  const onNotiUpdateSuccessHandler = ({isUpdateOrDelete}) => {
    
      if (isUpdateOrDelete === "ALLDELETE") {
        alert("알림이 모두 삭제되었습니다.");
      } else if (isUpdateOrDelete === "UPDATE") {
        alert("알림 선택 읽기가 완료되었습니다.");
      } else if (isUpdateOrDelete === "DELETE") {
        alert("알림 선택 삭제가 완료되었습니다.");
      }
      navigate(`${location.pathname}?${queryParams.toString()}`);
    
  };



  const notiUpdateHandler = useCallback((isUpdateOrDelete) => {
    if (isUpdateOrDelete === "ALLDELETE" || selectedTargetIds.size > 0) {
      tryFunc(
        updateNoficiations,
        onNotiUpdateSuccessHandler,
        dispatch
      )(isUpdateOrDelete);
    } else {
      alert("0개의 알림을 선택하셨습니다. 1개 이상의 알림을 선택해주세요.");
    }
  });



  const onAllCheckHandler = (isChecked) => {
    console.log(isChecked);

    if (isChecked) {
      if (notiPageList.length === 0) {
        alert("알림이 존재하지 않아 전체선택 하실 수 없습니다.");
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
  };

  return (
    <Container>
      <NotificationTitle onAllCheckHandler={onAllCheckHandler} />
      {notiPageList.length > 0 &&
        notiPageList.map((notification) =>
          selectedTargetIds.has(notification.notificationTargetId) ? (
            <Notification
              key={notification.notificationTargetId}
              notification={notification}
              onCheckboxChange={handleCheckboxChange}
              checked={true}
            />
          ) : (
            <Notification
              key={notification.notificationTargetId}
              notification={notification}
              onCheckboxChange={handleCheckboxChange}
              checked={false}
            />
          )
        )}
     
      <ButtonContainer>
        <button
          onClick={() => {
            notiUpdateHandler("ALLDELETE");
          }}
        >
          모두삭제
        </button>
        <button
          onClick={() => {
            notiUpdateHandler("UPDATE");

          }}
        >
          선택읽음
        </button>
        <button
          onClick={() => {
            notiUpdateHandler("DELETE");

          }}
        >
          선택삭제
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default NotificationList;
