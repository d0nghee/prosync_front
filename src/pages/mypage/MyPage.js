import React, { useEffect } from 'react'
import EditMember from '../../components/mypage/EditMember'
import BookMark from '../../components/mypage/BookMark'
import Myproject from '../../components/mypage/MyProject'
import EditPassword from '../../components/mypage/EditPassword'
import LeaveMember from '../../components/mypage/LeaveMember'
import { GridContainer, Header, Content, Footer } from '../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import SideMenu from '../../components/mypage/SideMenu'
import {
  useNavigate,
  useParams,
  useRouteLoaderData,
  useLocation,
} from "react-router-dom";


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
    case "/user/myproject":
      content = <Myproject />;
      break;
    case "/user/leave":
      content = <LeaveMember />;
      break;
  }

  return (
    <>
      <GridContainer>

        <SideMenu />
        <Content>
          {content}
        </Content>

      </GridContainer>
    </>
  );
}
