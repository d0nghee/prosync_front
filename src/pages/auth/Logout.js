import { redirect } from "react-router-dom";
import { removeCookie } from "../../util/cookies";

export function action() {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeCookie("profile");
  removeCookie("name");
  return redirect("/auth?mode=login");
}
