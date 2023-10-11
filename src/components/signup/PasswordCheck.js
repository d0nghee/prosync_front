import React from 'react'

const PasswordCheck = ({isPasswordNotCorrect}) => {
    return (
        <>
          {isPasswordNotCorrect ? (
            <p style={{ width:"2rem", color: "red", marginLeft: "2rem",fontWeight: "800"}}>비밀번호 형식이 잘못되었습니다.</p>
          ) : null}
        </>
      );
}

export default PasswordCheck