import React from "react";
import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";
import Footer from "../components/common/Footer";

export default function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer/>
      </>
  );
}
