import React, { useEffect } from 'react'
import EditMember from '../components/mypage/EditMember'
import EditPassword from '../components/mypage/EditPassword'
import Myproject from '../components/mypage/MyProject'
import BookMark from '../components/mypage/BookMark'
import SideMenu from '../components/side/SideMenu'
import MypageDefault from '../components/mypage/MypageDefault'
import { GridContainer, Header, Content, Footer } from '../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../util/axios/axiosInstances'


export default function MyPage() {

  const mypage = useSelector(state => state.mypage);
  const dispatch = useDispatch();



  useEffect(() => {

    // axiosInstance.get('/members')
    // .then((response) => {
    //   console.log(response.data.email);
    // })
    // .catch()
  }, [])

 

  return (
    <>
        <GridContainer>
          <Header>header</Header>
          <SideMenu>
          </SideMenu>
          <Content>
            {mypage.selectedComponent === 'InfoEdit' && <EditMember />}
            {mypage.selectedComponent === 'BookMark' && <BookMark />}
            {mypage.selectedComponent === 'MyProject' && <Myproject />}
            {mypage.selectedComponent === 'PwEdit' && <EditPassword />}
          </Content>
          <Footer>footer</Footer>
        </GridContainer>
    </>
  )
}
