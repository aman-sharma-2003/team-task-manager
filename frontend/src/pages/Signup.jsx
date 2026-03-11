import React from "react";
import { LoginSignupForm } from "../components/LoginSigupForm";

const Signup = () => {
  return (
    <div>
      <div className="text-center text-2xl font-semibold">Create Account</div>
      <LoginSignupForm formType="signup" />
    </div>
  );
};

export default Signup;
