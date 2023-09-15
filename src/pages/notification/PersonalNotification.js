import React, { useState, useEffect, useCallback } from "react";
import NotificationSearchBar from "./../../components/notification/NotificationSearchBar";
import NotificationList from "./../../components/notification/NotificationList";
import { getApi } from "../../util/api";
import { json } from "react-router-dom";
import Pagination from "./../../components/notification/Pagination";
import styled from "styled-components";



const Loading = styled.div`
color: gray;
font-weight: 900;
width: 30rem;
height: 10rem;
margin-left: 40%;
margin-top: 10%;
`;




const PersonalNotification = () => {
  const [searchCondition, setSearchCondition] 
  = useState({notiCode: '',
    startDate: '',
    endDate: '',
    content: '',
    size: '',
    page: ''});

  const [notificationPageList, setNotificationPageList] = useState([]);
  const [notificationPageInfo, setNotificationPageInfo] = useState({
    page: '',
    size: '',
    totalElements: '',
    totalPages: '',
  });

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getNotiList = async () => {
      setIsLoading(true);
      

      console.log("useEffect에서 데이터 요청함");
      const response = await getApi(`/notificationList?notiCode=${searchCondition.notiCode}&startDate=${searchCondition.startDate}&endDate=${searchCondition.endDate}&content=${searchCondition.content}&size=${searchCondition.size}&page=${searchCondition.page}`);
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
  }, [searchCondition]);

  const onConditionChangeHandler = useCallback((postSearchCondition) => {
    setSearchCondition(postSearchCondition);
  }, []);




  return (
      <>
      <NotificationSearchBar
        onConditionChangeHandler={onConditionChangeHandler}/>
      {!isLoading && ( <><NotificationList notiPageList={notificationPageList} onConditionChangeHandler={onConditionChangeHandler}/>
      <Pagination pageInfo={notificationPageInfo} pageCount={5} searchCondition={searchCondition} onConditionChangeHandler={onConditionChangeHandler}/></>)}
      {isLoading && (<Loading>데이터를 로딩중입니다. 잠시만 기다려주세요.</Loading>)}
    </>
  );
};


export default PersonalNotification;
