import React, { useEffect, useState, useRef } from 'react'
import { SideBar, SideMenuDetail, List, ListItem, ListItemButton } from '../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../redux/mypageSlice';


export default function SideMenu() {

    const dispatch = useDispatch();
    const sidemenu = useSelector(state => state.mypage);

    const [isListVisible, setIsListVisible] = useState(false);
    const menuDetailRef = useRef(null);

    const toggleList = () => {
        setIsListVisible(!isListVisible);
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuDetailRef.current && !menuDetailRef.current.contains(e.target)) {
                setIsListVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleMenuClick = (component) => {
        dispatch(setSelectedComponent(component));
        console.log(component);
    }

    return (
        <SideBar>
            <SideMenuDetail onClick={() => handleMenuClick('PwEdit')}>비밀번호 변경</SideMenuDetail>

            <SideMenuDetail onClick={toggleList} ref={menuDetailRef}>
                회원 정보
                {isListVisible && (
                    <List>
                        <ListItem>
                            <div onClick={() => handleMenuClick('InfoEdit')}>
                                <ListItemButton >회원 정보 수정</ListItemButton>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div onClick={() => handleMenuClick('BookMark')}>
                                <ListItemButton>북마크 리스트</ListItemButton>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div onClick={() => handleMenuClick('MyProject')}>
                                <ListItemButton>내 프로젝트</ListItemButton>
                            </div>
                        </ListItem>
                    </List>
                )}
            </SideMenuDetail>


        </SideBar>
    )
}
