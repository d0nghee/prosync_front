import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div.attrs({
  className: 'bg-white shadow',
})`
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px;
`;

const List = styled.ul.attrs({
  className: 'list-unstyled',
})``;

const ListItem = styled.li.attrs({
  className: 'my-3',
})`
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 0;

  &:hover {
    background-color: #e9ecef;
    padding: 10px;
  }

  img {
    margin-right: 10px;
    height: 18px;
    width: auto;
  }
`;

//TODO: 페이지 따라 메뉴 내용 바꾸기
function SideBar() {

  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <List onClick={(e)=> e.preventDefault()}>
        <ListItem onClick={()=> navigate('/')}>
          <img src={process.env.PUBLIC_URL + '/img/home.png'} alt="홈" />홈 화면
        </ListItem>
        <ListItem>
          <img
            src={process.env.PUBLIC_URL + '/img/project.png'}
            alt="프로젝트"
          />
          공개된 프로젝트
        </ListItem>
        <hr />
        <ListItem>알림</ListItem>
        <hr />
        <ListItem onClick={()=>{console.log('hi'); navigate('/notificationList')}}>개인 알림</ListItem>
        <ListItem onClick={()=> navigate('/notificationList/projects')}>프로젝트 알림</ListItem>
      </List>
    </SidebarContainer>
  );
}

export default SideBar;