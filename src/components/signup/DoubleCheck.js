import React from "react";
import { useDispatch } from "react-redux";
import { setIsPasswordMatch } from "../../redux/reducers/signupSlice";

export default function DoubleCheck(props) {
  const dispatch = useDispatch();

  const { First, Second } = props;

  const check = () => {
    if (First === "" && Second === "") {
      return <p style={{ color: "red", marginLeft: "2rem" }}>미입력</p>;
    } else if (First === Second) {
      dispatch(setIsPasswordMatch(true));
      return <p style={{ color: "green", marginLeft: "2rem" }}>일치함</p>;
    } else {
      dispatch(setIsPasswordMatch(false));
      return <p style={{ color: "red", marginLeft: "2rem" }}>불일치</p>;
    }
  };

  return (
    // <div>
    <>{check()}</>
    // </div>
  );
}
