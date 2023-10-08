import { redirect, useNavigate } from "react-router-dom";
import { removeUserCookie } from "../../util/cookies";
import { getApi } from "../../util/api";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { useEffect } from "react";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("로그아웃 발생");
    alert('로그아웃이 완료되었습니다.')
    getApi("/removeToken").then((res) => {
      removeUserCookie();
      dispatch(setIsLoggedIn(false));
      navigate("/");
    }).catch((error)=> {
      console.log('로그아웃 실패');
      console.log(error);
    });

  }, [navigate]);

  return null;
}
