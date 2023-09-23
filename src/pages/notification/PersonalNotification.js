import React, { useState, useEffect, useCallback } from "react";
import NotificationList from "./../../components/notification/NotificationList";
import { getApi, patchApi } from "../../util/api";
import { json, useLocation, useNavigate } from "react-router-dom";
import Pagination from "./../../components/notification/Pagination";
import styled from "styled-components";
import UpperBar from './../../components/notification/UpperBar';

const Loading = styled.div`
  color: gray;
  font-weight: 900;
  width: 30rem;
  height: 10rem;
  margin-left: 40%;
  margin-top: 10%;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 15%;
  margin-top: 2.5%;

`

const codeInformation = [
  {
    id: 1,
    code: "TASK_REMOVE",
    value: "업무삭제",
  },
  {
    id: 2,
    code: "TASK_ASSIGNMENT",
    value: "업무지정",
  },
  {
    id: 3,
    code: "TASK_MODIFICATION",
    value: "업무수정",
  },
  {
    id: 4,
    code: "TASK_EXCLUDED",
    value: "업무제외",
  },
  {
    id: 5,
    code: "PROJECT_ASSIGNMENT",
    value: "프로젝트지정",
  },
  {
    id: 6,
    code: "PROJECT_EXCLUDED",
    value: "프로젝트제외",
  },
  {
    id: 7,
    code: "PROJECT_MODIFICATION",
    value: "프로젝트수정",
  },
  {
    id: 8,
    code: "PROJECT_REMOVE",
    value: "프로젝트삭제",
  },
  {
    id: 9,
    code: "COMMENT_ADD",
    value: "댓글추가",
  },
  {
    id: 10,
    code: "COMMENT_REMOVE",
    value: "댓글삭제",
  },
  {
    id: 11,
    code: "COMMENT_MODIFICATION",
    value: "댓글수정",
  },
  {
    id: 12,
    code: "CHANGE_AUTHORITY",
    value: "권한변경",
  },
];

const PersonalNotification = () => {
  const [notificationPageList, setNotificationPageList] = useState([]);
  const [notificationPageInfo, setNotificationPageInfo] = useState({
    page: "",
    size: "",
    totalElements: "",
    totalPages: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notReadCount, setNotReadCount] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('count 불림');
    getApi("/notification/count")
      .then((response) => {
        if (response && response.status === 200) {
          setNotReadCount(response.data);
        }
      })
      .catch((error) => {
        throw json(
          { status: error.response.status },
          { message: error.response.data.resultCode }
        );
      });
  }, [location]);

  useEffect(() => {

    
    const getNotiList = async () => {
      setIsLoading(true);

      console.log("useEffect에서 데이터 요청함");
      const response = await getApi(`notificationList?${queryParams.toString()}`);
      console.log(response);
      console.log(response.status);
      if (
        response.response &&
        (response.response.status === 500 || response.response.status === 404)
      ) {
        throw json(
          { status: response.response.status },
          { message: response.response.data.resultCode }
        );
      }

      setNotificationPageList(response.data.data);
      setNotificationPageInfo(response.data.pageInfo);
      setIsLoading(false);
    };

    getNotiList();
  }, [location]);

  const AllRead = useCallback(() => {
    if (window.confirm("모든 알림을 읽음 처리하시겠습니까?")) {
      alert("모든 알림을 읽음 처리 하였습니다.");
      patchApi("/notification/allRead")
        .then((response) => {
          if (response && response.status === 200) {
            setNotReadCount(response.data);
          }
        })
        .catch((error) => {
          throw json(
            { status: error.response.status },
            { message: error.response.data.resultCode }
          );
        });
    } else {
      alert("읽음 처리를 취소하셨습니다.");
    }
    
    navigate(`${location.pathname}?${queryParams.toString()}`);

  }, []);


  return (
    <Container>
      <UpperBar
        isPersonal={true}
        codeInformation={codeInformation} 
        notReadCount={notReadCount} 
        AllRead={AllRead}
        count={notificationPageInfo.totalElements}/>
      {!isLoading && (
        <>
          <NotificationList
            notiPageList={notificationPageList}
          />
          <Pagination
            pageInfo={notificationPageInfo}
            pageCount={5}
          />
        </>
      )}
      {isLoading && (
        <Loading>데이터를 로딩중입니다. 잠시만 기다려주세요.</Loading>
      )}
    </Container>
  );
};

export default PersonalNotification;