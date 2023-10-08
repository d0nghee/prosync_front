import React from 'react'

const VerifyCheck = ({isVerifyCodeButtonVisible}) => {
    return (
        <>
          {isVerifyCodeButtonVisible ? (
            <p style={{ color: "green", marginLeft: "2rem",fontWeight: "800"}}>통과</p>
          ) : null}
        </>
      );
}

export default VerifyCheck