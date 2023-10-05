import React, { useEffect } from 'react';
import EditMember from './components/EditMember';
import BookMark from './components/BookMark';
import Myproject from './components/MyProject';
import EditPassword from './components/EditPassword';
import LeaveMember from './components/LeaveMember';
import { GridContainer, Header, Content, Footer } from '../../css/MyPageStyle';
import { useDispatch, useSelector } from 'react-redux';
import SideMenu from './components/SideMenu';
import {
  useNavigate,
  useParams,
  useRouteLoaderData,
  useLocation,
} from 'react-router-dom';

export default function MyPage() {
  const isLoggedIn = Boolean(useRouteLoaderData('root'));
  const mypage = useSelector((state) => state.mypage);
  const navi = useNavigate();
  const location = useLocation();

  let content;

  switch (location.pathname) {
    case '/user/password':
      content = <EditPassword />;
      break;
    case '/user/profile':
      content = <EditMember />;
      break;
    case '/user/bookmark':
      content = <BookMark />;
      break;
    case '/user/myproject':
      content = <Myproject />;
      break;
    case '/user/leave':
      content = <LeaveMember />;
      break;
  }

  // useEffect(() => {

  // })

  // useEffect(() => {

  //   if (!isLoggedIn) {

  //     navi("/auth?mode=login");
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   console.log("로그인 안 됨");
  //   return null;
  // }

  return (
    <>
      <GridContainer>
        <SideMenu />
        <Content>{content}</Content>
      </GridContainer>
    </>
  );
}
