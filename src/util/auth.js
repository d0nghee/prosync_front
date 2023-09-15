import { redirect } from "react-router-dom";
import { getCookie } from "./cookies";

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
    return redirect("/auth?mode=login");
  }
  return null;
}
