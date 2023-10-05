import React from "react";
import { useSelector } from "react-redux";

const EmailCheck = () => {
  const isEmailValid = useSelector((state) => state.signup.isEmailValid);
  console.log(isEmailValid);
  return (
    <>
      {isEmailValid ? (
        <p style={{ color: "green", marginLeft: "2rem" ,fontWeight: "800"}}>통과</p>
      ) : null}
    </>
  );
};

export default EmailCheck;
