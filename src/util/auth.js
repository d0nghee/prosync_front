import { redirect } from "react-router-dom";

export function accessTokenLoader() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return accessToken;
}

export function checkTokenLoader() {
  const accessToken = accessTokenLoader();
  if (!accessToken) {
    return redirect("/auth");
  }
  return null;
}
