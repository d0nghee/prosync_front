import { redirect } from "react-router-dom";
import { removeUserCookie } from "../../util/cookies";

export function action() {
  removeUserCookie();
  return redirect("/auth?mode=login");
}
