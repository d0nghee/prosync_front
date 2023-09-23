import React, { useEffect, useState, useRef } from 'react'
import { SideBar, SideMenuDetail, List, ListItem } from '../../../css/MyPageStyle'
import { useDispatch } from 'react-redux';
import { setSelectedComponent } from '../../../redux/reducers/mypageSlice';
import LeaveButton from './LeaveButton';


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
                               회원 정보 수정
                            </div>
                        </ListItem>
                        <ListItem>
                            <div onClick={() => handleMenuClick('BookMark')}>
                                북마크 리스트
                            </div>
                        </ListItem>
                        <ListItem>
                            <div onClick={() => handleMenuClick('MyProject')}>
                                내 프로젝트
                            </div>
                        </ListItem>
                    </List>
                )}
            </SideMenuDetail>

            <SideMenuDetail>
                <LeaveButton onClick={() => handleMenuClick('Leave')} />
            </SideMenuDetail>


        </SideBar>
    )
}
