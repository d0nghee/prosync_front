import React, { useEffect, useState } from 'react'
import Button from '../../../components/button/Button'
import axiosInstance from '../../../util/axiosInstancs'
import styled from 'styled-components'
import { Content, GridContainer, InputText } from '../../../css/MyPageStyle'
import { deleteApi } from '../../../util/api'
import Popup from '../../../components/popup/Popup'
import { useDispatch, useSelector } from 'react-redux'
import { setIsConfirmModalOpen, setModalButtons, setModalMessage } from '../../../redux/reducers/signupSlice'
import { useLoaderData, useNavigate } from 'react-router-dom'

const Div = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 60vh;
    width: 1000px;
`

const CustomStyle = {
  border: '3px blue solid',
  width: '30vw',
  height: '3vw',
  fontSize: '20px',
  fontStyle: 'italic'
}

export default function LeaveMember() {
  const dispatch = useDispatch();
  const signup = useSelector(state => state.signup);
  const [inputMessage, setInputMessage] = useState("");
  const navi = useNavigate();



  const handleChange = (e) => {
    setInputMessage(
      ...inputMessage,
      e.target.value
    )
  }

  const handleLeaveMember = () => {
    if (inputMessage === "탈퇴합니다") {
      deleteApi("/members")
        .then(() => {
          dispatch(setIsConfirmModalOpen());
          dispatch(setModalMessage("탈퇴되었습니다"))
          dispatch(setModalButtons([
            { label: "확인", onClick: () => dispatch(setIsConfirmModalOpen()) }
          ]))
        })
    } else {
      dispatch(setIsConfirmModalOpen());
      dispatch(setModalMessage("정확하게 입력해주세요"))
      dispatch(setModalButtons([
        { label: "확인", onClick: () => dispatch(setIsConfirmModalOpen()) }
      ]))
    }

  }

  return (
    <Div>
      <InputText
        style={CustomStyle}
        placeholder='탈퇴합니다'
        onChange={handleChange}
      />
      <Button
        onClick={handleLeaveMember}
        label="탈퇴"
        width="20vw"
      ></Button>
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      />
    </Div>
  )
}
