import React, { useId, useState } from "react";
import { ErrorMessage } from "./MessageBox";

export const Input = ({ label, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className="placeholder:font-normal placeholder:text-md bg-[#f7faff] border border-[#e7e9ec] rounded-lg px-3 py-2 w-full"
          {...rest}
          type={rest?.type === "password" && showPassword ? "text" : rest?.type}
        />
        {rest?.type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.75 cursor-pointer"
          >
            {showPassword ? (
              <img className="size-5" src="/eyeclose.png" alt="eye" />
            ) : (
              <img className="size-5" src="/eye.png" alt="eye" />
            )}
          </span>
        )}
      </div>

      <ErrorMessage errorMessage={error} />
    </div>
  );
};
