import React from 'react'

const NameCheck = ({isNameNotCorrect}) => {
    return (
        <>
          {isNameNotCorrect ? (
            <p style={{ color: "red", marginLeft: "2rem",fontWeight: "800"}}>이름 형식이 잘못되었습니다.</p>
          ) : null}
        </>
      );
}

export default NameCheck