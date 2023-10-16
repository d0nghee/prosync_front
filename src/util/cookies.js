import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function setCookie(name, value, option) {
  return cookies.set(name, value, { ...option });
}

export function getCookie(name) {
  return cookies.get(name, { path: "/" });
}

export function removeCookie(name) {
  return cookies.remove(name, { path: "/" });
}

export function removeUserCookie() {
  console.log('쿠키삭제 ^^');
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeCookie("profile");
  removeCookie("name");
  removeCookie("memberId");
  removeCookie("email");
}
