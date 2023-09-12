import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function setCookie(name, value, option) {
  return cookies.set(name, value, { ...option });
}

export function getCookie(name) {
  return cookies.get(name);
}

export function removeCookie(name) {
  return cookies.remove(name, { path: "/" });
}

export function removeUserCookie() {
  removeCookie("accessToken");
  setCookie("refreshToken", "", { maxAge: 0 });
  removeCookie("profile");
  removeCookie("name");
}
