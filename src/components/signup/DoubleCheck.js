import React from "react";
import { useDispatch } from "react-redux";
import { setIsPasswordMatch } from "../../redux/reducers/member/signupSlice";

export default function DoubleCheck(props) {
  const dispatch = useDispatch();

  const { First, Second } = props;

  const check = () => {
    if (First === "" && Second === "") {
      return (
        <div
          style={{
            width: "100px",
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          미입력
        </div>
      );
    } else if (First === Second) {
      dispatch(setIsPasswordMatch(true));
      return (
        <div
          style={{
            width: "100px",
            color: "green",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          일치함
        </div>
      );
    } else {
      dispatch(setIsPasswordMatch(false));
      return (
        <div
          style={{
            width: "100px",
            color: "red",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          불일치
        </div>
      );
    }
  };

  return (
    // <div>
    <>{check()}</>
    // </div>
  );
}
