import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import { redirect } from "react-router-dom";
import { setCookie } from "../../util/cookies";
import { getApi, postApi } from "../../util/api";

export default function Authentication() {
  return <AuthForm />;
}

