import { redirect } from "react-router-dom";
import { getCookie, removeCookie, removeUserCookie } from "./cookies";
import { setIsLoggedIn } from "../redux/reducers/loginSlice";

export function accessTokenLoader() {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    
    return null;

  }

  return accessToken;

}

export function checkTokenLoader() {
  const accessToken = accessTokenLoader();

  if (!accessToken) {
    console.log("토큰 없음")

    return redirect("/auth?mode=login");
  }
  
  return null;
  
}
