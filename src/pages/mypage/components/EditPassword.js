import React, { useEffect } from 'react'
import { CustomDiv, Label, InputText } from '../../../css/MyPageStyle'
import Button from '../../../components/button/Button'
import Popup from '../../../components/popup/Popup'
import { useDispatch, useSelector } from 'react-redux'
import { setMemberInfo } from '../../../redux/reducers/mypageSlice'
import { setIsConfirmModalOpen, setModalButtons, setModalMessage } from '../../../redux/reducers/signupSlice'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { patchApi } from '../../../util/api'

export default function EditPassword() {
  const isLoggedIn = Boolean(useRouteLoaderData("root"));
  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);
  const signup = useSelector(state => state.signup);
  const navi = useNavigate();


  const handleChange = (e) => {
    console.log(mypage.memberInfo);

    dispatch(setMemberInfo({
      ...mypage.memberInfo,
      [e.target.name] : e.target.value,

    }));

  }

  const data = {
    password : mypage.memberInfo.password,
  }

  const modifyPassword = () => {
    if (mypage.memberInfo.password === mypage.memberInfo.pw) {
      patchApi("/members/password", data)
        .then(() => {
          dispatch(setIsConfirmModalOpen());
          dispatch(setModalButtons([
            { label : '확인', onClick : () => { dispatch(setIsConfirmModalOpen()) } }
          ]));
          dispatch(setModalMessage("SUCCESS"));
          navi("/");

        }).catch((error) => {
          console.log(error);
          dispatch(setIsConfirmModalOpen());
          dispatch(setModalMessage("FAIL"));
          dispatch(setModalButtons([
            { label : '확인', onClick : () => { dispatch(setIsConfirmModalOpen()) } }
          ]));

        })

    }

  }
  
  useEffect(() => {
    if (!isLoggedIn) {
      navi("/auth?mode=login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <CustomDiv>
        <Label>변경 비밀번호 입력 : &nbsp;</Label>
        <InputText type='password' name='password' id='password' onChange={ handleChange } />
      </CustomDiv>
      <CustomDiv>
        <Label> 비밀번호 재입력 : &nbsp;</Label>
        <InputText type='password' name='pw' id='pw' onChange={ handleChange } />
      </CustomDiv>
      <CustomDiv style={{ justifyContent: 'center' }}>
        <Button
          backgroundColor='#7B69B7'
          width='20%'
          label='수정'
          color="#FFDAB9"
          onClick={modifyPassword}
        ></Button>
        <Button
          backgroundColor='#E9967A'
          width='20%'
          label='취소'
          color="#FFDAB9"
          onClick={() => navi("/")}
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
