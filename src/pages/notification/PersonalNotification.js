import React, { useState, useEffect, useCallback } from "react";
import NotificationList from "./../../components/notification/NotificationList";
import { getApi, patchApi } from "../../util/api";
import { json, useLocation, useNavigate } from "react-router-dom";
import Pagination from "./../../components/notification/Pagination";
import styled from "styled-components";
import UpperBar from "./../../components/notification/UpperBar";
import { tryFunc } from "./../../util/tryFunc";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { setTrigger } from "../../redux/reducers/notification/notificationTrigger-slice";
import { useDispatch } from "react-redux";
import ListLoadingSpinner from "../../components/common/ListLoadingSpinner";

const Loading = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  width: 85%;
  height: 100%;
  margin-left: 10%;
  margin-top: 2.5%;
`;

const NoData = styled.div`
  height: 45rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 900;
  padding-top: 20%;
`;

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
    code: "PROJECT_EXIT",
    value: "프로젝트탈퇴",
  },
  {
    id: 10,
    code: "COMMENT_ADD",
    value: "댓글추가",
  },
  {
    id: 11,
    code: "COMMENT_REMOVE",
    value: "댓글삭제",
  },
  {
    id: 12,
    code: "COMMENT_MODIFICATION",
    value: "댓글수정",
  },
  {
    id: 13,
    code: "CHANGE_AUTHORITY",
    value: "권한변경",
  },
];

const PersonalNotification = (props) => {
  const [notificationPageList, setNotificationPageList] = useState([]);
  const [notificationPageInfo, setNotificationPageInfo] = useState({
    page: "",
    size: "",
    totalElements: "",
    totalPages: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notReadCount, setNotReadCount] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const fetchNotificationCount = async () => {
    const response = await getApi("/notification/count");
    return response.data;
  };

  const onNotificationCountSuccess = (data) => {
    setNotReadCount(data);
  };



  useEffect(() => {
    console.log("count 불림");
    tryFunc(fetchNotificationCount, onNotificationCountSuccess, dispatch)();
  }, [location]);

  const fetchNotificationList = async () => {
    const response = await getApi(`notificationList?${queryParams.toString()}`);
    return response.data;
  };

  const onFetchNotificationListSuccess = (data) => {
    setNotificationPageList(data.data);
    setNotificationPageInfo(data.pageInfo);
    setIsLoading(false);
  };



  useEffect(() => {
    const getNotiList = async () => {
      setIsLoading(true);
      console.log("Notification 정보를 위해 useEffect에서 데이터 요청함");
      tryFunc(
        fetchNotificationList,
        onFetchNotificationListSuccess,
        dispatch
      )();
    };

    getNotiList();
  }, [location]);

  const fetchAllReadNotification = async () => {
    const response = await patchApi("/notification/allRead");
    return response.data;
  };

  const onAllReadSuccess = (data) => {
    setNotReadCount(data);
    setTrigger();
    alert("모든 알림을 읽음 처리 하였습니다.");
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };



  const AllRead = useCallback(() => {
    if (window.confirm("모든 알림을 읽음 처리하시겠습니까?")) {
      tryFunc(fetchAllReadNotification, onAllReadSuccess, dispatch)();
    } else {
      alert("읽음 처리를 취소하셨습니다.");
    }
  }, []);

  return (
    <Container>
      <UpperBar
        isPersonal={true}
        codeInformation={codeInformation}
        notReadCount={notReadCount}
        AllRead={AllRead}
        count={notificationPageInfo.totalElements}
      />
      {!isLoading && (
        <>
          {notificationPageInfo.totalElements !== 0 ? (
            <>
              <NotificationList notiPageList={notificationPageList} />
              <Pagination
                pageInfo={notificationPageInfo}
                pageCount={5}
                isPersonal={true}
              />
            </>
          ) : (
            <NoData>알림이 존재하지 않습니다</NoData>
          )}
        </>
      )}
      {isLoading && (
        <Loading>
          <ListLoadingSpinner />;
        </Loading>
      )}
    </Container>
  );
};

export default PersonalNotification;
