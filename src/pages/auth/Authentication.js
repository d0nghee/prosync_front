import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import { redirect } from "react-router-dom";
import { setCookie } from "../../util/cookies";
import { getApi, postApi } from "../../util/api";

export default function Authentication() {
  return <AuthForm />;
}

// export async function action({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   let mode = searchParams.get("mode") || "login";

//   if (mode === "signup") {
//     mode = "members";
//   }

//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   await postApi(`/${mode}`, authData)
//     .then(async (response) => {
//       const headers = response.headers;
//       const access = await headers.authorization;
//       const refresh = await headers.refresh;
//       if (access && refresh) {
//         setCookie("accessToken", access, { path: "/" });
//         setCookie("refreshToken", refresh, {
//           path: "/",
//           maxAge: 60 * 60 * 24 * 30,
//           // secure: true,
//           // httpOnly: true,
//         }); // 유효기간 30일
//       }
//       return response.status;
//     })
//     .then(async (status) => {
//       if (status === 200) {
//         await getApi("/members")
//           .then(async (response) => {
//             setCookie("profile", response.data.profileImage, { path: "/" });
//             setCookie("name", response.data.name, { path: "/" });
//           })
//           .catch((error) => console.log(error));
//       }
//     })
//     .catch(async (error) => {});

//   if (mode === "login") {
//     return redirect("/");
//   }
//   return redirect("/auth?mode=login");
// }