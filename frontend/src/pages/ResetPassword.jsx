import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../zod/resetPasswordSchema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ErrorMessage, SuccessMessage } from "../components/ui/MessageBox";
import { useEffect } from "react";
import { clearMessages } from "../features/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/authSlice";

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(resetPassword({ token, data }));
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
      <div className="text-center text-2xl font-semibold">Reset Password</div>

      <form
        className="flex flex-col font-medium gap-3 my-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="New Password"
          type="password"
          placeholder="New password"
          {...register("password")}
          error={errors?.password?.message}
        />

        <Button type="submit" isLoading={loading}>Reset Password</Button>

        <ErrorMessage authError={true} errorMessage={error} />
        <SuccessMessage successMessage={success} />
      </form>
    </div>
  );
}
