import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";
import PageContent from "../components/common/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong";

  if (error.data.status === 500) {
    message =
      "죄송합니다. 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (error.data.status === 404) {
    title = "PAGE NOT FOUND!";
    message = "해당 URL에 해당하는 페이지를 찾을 수 없습니다.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title} message={message} />
    </>
  );
}
