import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import styled from 'styled-components'
import { Content, GridContainer, InputText } from '../../css/MyPageStyle'
import { deleteApi } from '../../util/api'
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
  const [inputMessage, setInputMessage] = useState("");
  const navi = useNavigate();

  const handleChange = (e) => {
    setInputMessage(e.target.value)
    console.log(inputMessage);
  }

  console.log(inputMessage);

  const handleLeaveMember = () => {
    if (inputMessage === "탈퇴합니다") {
      deleteApi("/members")
        .then(() => {
          alert("탈퇴되었습니다.");
          navi("/logout");
        })
    } else {
      alert("정확하게 입력해주세요.");
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
    </Div>
  )
}
