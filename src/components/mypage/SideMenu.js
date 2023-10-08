import React, { useEffect, useState, useRef } from 'react'
import { SideBar, SideMenuDetail, List, ListItem } from '../../css/MyPageStyle'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


export default function SideMenu() {

    const dispatch = useDispatch();

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

    
    return (
        <SideBar>
            <SideMenuDetail>
                <Link to='/user/password'>비밀번호 변경</Link>    
            </SideMenuDetail>

            <SideMenuDetail onClick={toggleList} ref={menuDetailRef}>
                회원 정보
                {isListVisible && (
                    <List>
                        <ListItem>
                            <Link to='/user/profile'>프로필 수정</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/user/bookmark'>북마크 리스트</Link>
                        </ListItem>
                        <ListItem>
                            <Link to='/user/myproject'>내 프로젝트</Link>
                        </ListItem>
                    </List>
                )}
            </SideMenuDetail>

            <SideMenuDetail>
                    <Link to='/user/leave'>회원 탈퇴</Link>
            </SideMenuDetail>


        </SideBar>
    )
}
