import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";
import PageContent from "../components/common/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "NOT FOUND!";
    message = "Could not find resource or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title} message={message} />
    </>
  );
}
