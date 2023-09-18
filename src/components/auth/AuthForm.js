import React from "react";
import { Form, useNavigation, useSearchParams, Link } from "react-router-dom";
import SignUp from '../../pages/signup/SignUp'
import SignupImage from "../../assets/images/signup.jpg";
import Login from "../../pages/signup/Login";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main>
      {!isLogin && (
        <SignUp></SignUp>
      )}
      <Login></Login>
    </main>
  );
}
