import React from 'react'

const IntroCheck = ({isIntroNotCorrect}) => {
  return (
    <>
      {isIntroNotCorrect ? (
        <p style={{ color: "red", marginLeft: "2rem",fontWeight: "800"}}>소개글 형식이 잘못되었습니다.</p>
      ) : null}
    </>
  );
}

export default IntroCheck