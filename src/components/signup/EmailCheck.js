import React from "react";
import { useSelector } from "react-redux";

const EmailCheck = () => {
  const isEmailValid = useSelector((state) => state.signup.isEmailValid);
  console.log(isEmailValid);
  return (
    <>
      {isEmailValid ? (
        <div
          style={{
            textAlign: "center",
            color: "green",
            marginLeft: "2rem",
            fontWeight: "800",
            border: "1px solid black",
          }}
        >
          통과
        </div>
      ) : null}
    </>
  );
};

export default EmailCheck;
