import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../zod/forgotPasswordSchema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ErrorMessage, SuccessMessage } from "../components/ui/MessageBox";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/authSlice";
import { clearMessages } from "../features/statusSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(forgotPassword(data));
    reset();
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div>
      <div className="text-center text-2xl font-semibold">Forgot Password</div>

      <form
        className="flex flex-col font-medium gap-3 my-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          type="text"
          placeholder="john@gmail.com"
          {...register("email")}
          error={errors?.email?.message}
        />

        <Button type="submit" isLoading={loading}>Send Reset Link</Button>

        <ErrorMessage authError={true} errorMessage={error} />
        <SuccessMessage successMessage={success} />
      </form>
    </div>
  );
}
