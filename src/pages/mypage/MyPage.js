import React, { useEffect } from 'react'
import EditMember from './components/EditMember'
import BookMark from './components/BookMark'
import Myproject from './components/MyProject'
import EditPassword from './components/EditPassword'
import { GridContainer, Header, Content, Footer } from '../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import SideMenu from './components/SideMenu'
import { patchApi } from '../../util/api'
import { setCookie } from '../../util/cookies'
import { redirect } from 'react-router-dom'


export default function MyPage() {

  const mypage = useSelector(state => state.mypage);
  const dispatch = useDispatch();

  console.log('mypage: '+mypage.selectedComponent);
  


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
