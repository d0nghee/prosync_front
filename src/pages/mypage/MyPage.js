import React, { useEffect } from "react";
import EditMember from "../../components/mypage/EditMember";
import BookMark from "../../components/mypage/BookMark";
import MyPageproject from "../../components/mypage/MyPageProject";
import EditPassword from "../../components/mypage/EditPassword";
import LeaveMember from "../../components/mypage/LeaveMember";
import { GridContainer, Header, Content, Footer, MypageContainer } from "../../css/MyPageStyle";
import SideMenu from "../../components/mypage/SideMenu";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from 'styled-components';


export default function MyPage() {
  const navi = useNavigate();
  const location = useLocation();

  let content;

  switch (location.pathname) {
    case "/user/password":
      content = <EditPassword />;
      break;
    case "/user/profile":
      content = <EditMember />;
      break;
    case "/user/bookmark":
      content = <BookMark />;
      break;
    case "/user/myprojects":
      content = <MyPageproject />;
      break;
    case "/user/leave":
      content = <LeaveMember />;
      break;
  }

  return (
    <MypageContainer>
      <Side>
        <SideMenu />
      </Side>
      <Content>
        {content}
      </Content>
    </MypageContainer>
  );
}

const Side = styled.div`
  margin-top: 30px;
  margin-left: 150px;
  width: 20%;
`
