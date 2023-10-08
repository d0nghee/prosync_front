import React from 'react'

export default function LeaveButton(props) {
    const { onClick } = props;

  return (
    <div onClick={onClick}>회원 탈퇴</div>
  )
}
