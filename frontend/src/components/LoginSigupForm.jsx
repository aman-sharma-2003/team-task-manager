import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../zod/signupSchema";
import { loginSchema } from "../zod/loginSchema";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ErrorMessage, SuccessMessage } from "./ui/MessageBox";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doLoginSignup, checkAuth } from "../features/authSlice";
import { clearMessages } from "../features/statusSlice";

export const LoginSignupForm = ({ formType }) => {
  const isRegisterForm = formType === "signup";
  const schema = isRegisterForm ? signupSchema : loginSchema;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.status);
  const { loggedInUser } = useSelector((state) => state.auth);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const url = isRegisterForm ? "/signup" : "/login";
    const result = await dispatch(doLoginSignup({ data, url }));

    if (doLoginSignup.fulfilled.match(result)) {
      reset();
      if (!isRegisterForm) {
        navigate("/home"); 
      }
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
        if (isRegisterForm) {
          navigate("/login");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, error, navigate, dispatch]);

  return (
    <div>
      <form
        className=" flex-1 font-medium mt-4 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isRegisterForm && (
          <Input
            label="Name"
            type="text"
            placeholder="Full Name"
            {...register("name")}
            error={errors?.name?.message}
          />
        )}

        <Input
          label="Email"
          type="text"
          placeholder="john@gmail.com"
          {...register("email")}
          error={errors?.email?.message}
        />
        {isRegisterForm && (
          <Input
            label="Phone Number"
            type="text"
            placeholder="+918642534567"
            {...register("phone")}
            error={errors?.phone?.message}
          />
        )}

        <Input
          label="Password"
          type="password"
          placeholder="John@123"
          {...register("password")}
          error={errors?.password?.message}
        />
        {!isRegisterForm && (
          <p className="text-right text-sm">
            <Button
              type="button"
              varient="link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </p>
        )}

        {isRegisterForm && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="John@123"
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
        )}
        <div className="mt-5">
          <Button type="submit" isLoading={loading}>
            {isRegisterForm ? "Sign Up" : "Log In"}
          </Button>
        </div>

        <p className="text-center mt-3">
          {isRegisterForm
            ? "Already have an account?"
            : "Don't have an account"}{" "}
          <Button
            type="button"
            varient="link"
            onClick={() => navigate(isRegisterForm ? "/login" : "/signup")}
          >
            {isRegisterForm ? "Log In" : "Sign Up"}
          </Button>
        </p>
        <ErrorMessage authError={true} errorMessage={error} />
        <SuccessMessage successMessage={success} />
      </form>
    </div>
  );
};
