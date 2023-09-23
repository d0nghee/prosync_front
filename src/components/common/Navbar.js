import React, { useState, useRef, useEffect } from 'react';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';
import {useNavigate} from 'react-router-dom';




const StyledNavbar = styled.div`
    height: 80px;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    box-shadow: 0px 8px 3px 0px rgba(0, 0, 0, 0.2);
`

const SideNavbar = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  background-color: #f9f9f9;
  position: fixed;
  top:0px;
  box-shadow: 10px 0px 16px 0px rgba(0, 0, 0, 0.2);
  z-index:"2000"

  // sideNavbar의 목록에 설정하는 값
  & a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  & a:hover {
    background-color: #f1f1f1;
  }
`;

const SearchBar = styled.input`
    background-color: lightgray;
    border-radius: 20px;
    border: 2px solid transparent; 
    transition: all 0.3s ease;
    height: 50%;
    width: 20%;
    position: absolute;
    right:20%;
    padding-left: 1%;


    &:focus {
        outline: none;
        background-color: #d3d3d3; 
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
        border-color: #888; 
    }

    &::placeholder {
        text-align: center;
    }
`

const SearchBox = styled.ul`
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    display : ${ props => (props.show ? 'flex' : 'none')};
    position : absolute;
    flex-direction: column;
    list-style-type: none;
    width:20%;
    padding:0;
    right:21%;
    top:60%;
    max-height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;

`

const SearchBoxItem = styled.li`
    padding: 8px;
    background-color: #7986CB;
    border: 1px solid white;
    color: white;
    width: 100%;
    cursor: pointer;

    &:hover {
        font-size: larger;
        font-weight: 700;
        color: wheat;
    }
`



export default function Navbar(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [showBox, setShowBox] = useState(false);
    
    const dropdownRefSidebar = useRef(null);
    const dropdownRefSearchbar = useRef(null);

    const toggleMenu = () => {
        setShowMenu(showMenu=>!showMenu);
      };




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefSidebar.current && !dropdownRefSidebar.current.contains(event.target)) {
                setShowMenu(false);
            }

            if (dropdownRefSearchbar.current && !dropdownRefSearchbar.current.contains(event.target)) {
                setShowBox(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log("여기"+searchList);
    if (searchList!=null) {
        searchList.map((item)=>console.log(item.name));
        console.log(showBox);
    }

    return (
        <StyledNavbar>
            <FontAwesomeIcon icon={faBars} style={{ marginLeft: "40px", cursor: "pointer" }} onClick={toggleMenu} />
            <SideNavbar show={showMenu} ref={dropdownRefSidebar}>
                <div style={{height: "100vh", backgroundColor: "lightgray", width: "15vw"}}></div>
            </SideNavbar>
            <SearchBar onChange={async (event)=>{
                const inputValue = event.target.value;
                setSearchValue(inputValue);

                setTimeout(async ()=> {
                    console.log(`현재 id는 : ${inputValue}`)

                    const renewList=await props.projectSearch(inputValue);

                    setSearchList(renewList);

                    console.log('현재 searchList는'+renewList);

                    setShowBox(true);
                },1000);

            
               }} onClick={async (event)=>{
                const inputValue = event.target.value;
                setSearchValue(inputValue);

                setTimeout(async ()=> {
                    console.log(`현재 id는 : ${inputValue}`)

                    const renewList=await props.projectSearch(inputValue);

                    setSearchList(renewList);

                    console.log('현재 searchList는'+renewList);

                    setShowBox(true);
                },1000);

                

            
               }} placeholder='프로젝트 검색하세요.'/>
            <SearchBox show={showBox} ref={dropdownRefSearchbar}>
               { 
                searchList?.map((item)=> {
                    return <SearchBoxItem key={item.id}> {/*onClick={()=>navigate(`/project/${item.id}`)}*/}{item.name}</SearchBoxItem>
                }
               )}
            </SearchBox>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginLeft: "10px", cursor: "pointer", position: 'absolute', right:"21%"}}/> {/*onClick={()=>navigate(`/project?search=${searchValue}`)}*/}
            
        </StyledNavbar>
    )
}


