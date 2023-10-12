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
    alert("로그아웃이 완료되었습니다.");
    getApi("/removeToken")
      .then((res) => {
        removeUserCookie();
        dispatch(setIsLoggedIn(false));
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setIsLoggedIn(false));
          removeUserCookie();
          navigate("/");
        } else if (error === undefined) {
          console.error("An undefined error occured!");
          alert("알 수 없는 오류가 발생했습니다.");
          navigate("/error");
        } else if (error.code === "ERR_NETWORK") {
          console.error("네트워크 에러 발생:", error);
          alert(
            "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
          );
          navigate("/error");
        }

        if (error.status) console.log("로그아웃 실패");
        console.log(error);
      });
  }, [navigate]);

  return null;
}
