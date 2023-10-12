import React from "react";
import { useDispatch } from "react-redux";
import { setIsPasswordMatch } from "../../redux/reducers/member/signupSlice";

export default function DoubleCheck(props) {
  const dispatch = useDispatch();

  const { First, Second } = props;

  const check = () => {
    if (First === "" && Second === "") {
      return <div style={{ width :"50px" ,color: "red", marginLeft: "2rem", marginTop : "10px"}}>미입력</div>;
    } else if (First === Second) {
      dispatch(setIsPasswordMatch(true));
      return <div style={{ width :"50px" ,color: "green", marginLeft: "2rem", marginTop : "10px"}}>일치함</div>;
    } else {
      dispatch(setIsPasswordMatch(false));
      return <div style={{ width :"50px" ,color: "red", marginLeft: "2rem", marginTop : "22px"}}>불일치</div>;
    }
  };

  return (
    // <div>
    <>{check()}</>
    // </div>
  );
}
