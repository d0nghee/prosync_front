import React from "react";
import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      submit(null, { action: "/logout", method: "post" });
    }
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
