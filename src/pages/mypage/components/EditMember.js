import React from 'react'
import Button from '../../../components/button/Button'
import Popup from '../../../components/popup/Popup'
import { styled } from 'styled-components'
import { CustomDiv, Label, InputText, InputTextArea } from '../../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import { setMemberInfo } from '../../../redux/reducers/mypageSlice'
import axiosInstance from '../../../util/axiosInstancs'
import { setIsConfirmModalOpen, setModalButtons, setModalMessage } from '../../../redux/reducers/signupSlice'
import { useNavigate } from 'react-router-dom'
import { getCookie, setCookie } from '../../../util/cookies'
import { getApi } from '../../../util/api'


export default function EditMember() {

  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const navi = useNavigate();
  const signup = useSelector(state => state.signup);

  const profileimg = getCookie("profile");

  const handleChange = (e) => {
    dispatch(setMemberInfo({
      ...mypage.memberInfo,
      [e.target.name]: e.target.value,
    }));

  }

  const handleFileChange = (e) => {

  }

  
  const handleEdit = () => {
    axiosInstance.patch("/members/profile", mypage.memberInfo)
      .then(() => {
        getApi("/members")
          .then(async (res) => {
            setCookie("profile", res.data.profileImage, { path: "/", maxAge: 60*60*24*30 });
            setCookie("name", res.data.name, { path: "/",maxAge: 60*60*24*30 });
            dispatch(setIsConfirmModalOpen(true));
            dispatch(setModalMessage('SUCCESS'));
            dispatch(setModalButtons([
              {
                label: "확인", onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                  navi("/");
                }
              }
            ]));

          })
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage('FAIL'));
        dispatch(setModalButtons([
          { label: '확인', onClick: () => { dispatch(setIsConfirmModalOpen(false)) } }
        ]));
      })
  }

  const handleCancel = () => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setModalMessage('취소하시겠습니까?'));
    dispatch(setModalButtons([
      { label: '확인', onClick: () => { dispatch(setIsConfirmModalOpen(false)); navi("/") } },
      { label: '취소' ,onClick: () => { dispatch(setIsConfirmModalOpen())}}
    ]));
  }

  return (
    <>
      <CustomDiv style={{ justifyContent: 'left', marginLeft: '100px' }}>
        
          <ProfileImage
            src={profileimg}
          />
        
        <div style={{ justifyContent: 'center', width: '100%', marginTop: '30px', marginLeft: '5rem' }}>
          <Button
            label='이미지 변경'
            width='15%'
            backgroundColor='#7B69B7'
            onClick={handleFileChange}
          ></Button>
        </div>
      </CustomDiv>
      <CustomDiv>
        <Label>이름 입력 : &nbsp;</Label>
        <InputText type='text' name='name' id='name' onChange={handleChange} />
      </CustomDiv>
      <CustomDiv>
        <Label>소개글 입력 :&nbsp;</Label>
        <InputTextArea name='intro' id='intro' onChange={handleChange} />
      </CustomDiv>
      <CustomDiv style={{ justifyContent: 'center' }}>
        <Button
          backgroundColor='#7B69B7'
          width='20%'
          label='수정'
          color="#FFDAB9"
          onClick={handleEdit}
        ></Button>
        <Button
          backgroundColor='#E9967A'
          width='20%'
          label='취소'
          color="#FFDAB9"
          onClick={handleCancel}
        ></Button>
      </CustomDiv>
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      />
    </>
  )
}

const ProfileImage = styled.img`
  width: 20rem;
  border: 5px solid #7B69B7;
  border-radius: 10rem;
  margin-left: 100px;
`;