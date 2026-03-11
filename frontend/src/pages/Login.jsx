import React from "react";
import { LoginSignupForm } from "../components/LoginSigupForm";

const Login = () => {
  return (
    <div>
      <div className="text-center text-2xl font-semibold">Login Account</div>
      <LoginSignupForm formType="login" />
    </div>
  );
};

export default Login;
