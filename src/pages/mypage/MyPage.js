import React, { useEffect } from 'react'
import EditMember from './components/EditMember'
import BookMark from './components/BookMark'
import Myproject from './components/MyProject'
import EditPassword from './components/EditPassword'
import LeaveMember from './components/LeaveMember'
import { GridContainer, Header, Content, Footer } from '../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import SideMenu from './components/SideMenu'


export default function MyPage() {

  const mypage = useSelector(state => state.mypage);

  return (
    <>
        <GridContainer>
          
          <SideMenu />
         

          <Content>
            {mypage.selectedComponent === 'InfoEdit' && <EditMember />}
            {mypage.selectedComponent === 'BookMark' && <BookMark />}
            {mypage.selectedComponent === 'MyProject' && <Myproject />}
            {mypage.selectedComponent === 'PwEdit' && <EditPassword />}
            {mypage.selectedComponent === 'Leave' && <LeaveMember />}
          </Content>
          
        </GridContainer>
    </>
  )
}
