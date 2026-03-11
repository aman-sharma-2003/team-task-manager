import React from "react";
import { cn } from "../../utils/style";

const buttonVariant = {
  link: "text-blue-500 cursor-pointer hover:text-blue-500",
  default:
    "w-full bg-blue-500 hover:bg-blue-600 px-10 py-2 rounded-lg text-white cursor-pointer disabled:bg-gray-400  disabled:cursor-default",
};

export const Button = ({
  children,
  isLoading,
  varient,
  className = "",
  ...rest
}) => {
  const buttonClassName = buttonVariant[varient] ?? buttonVariant.default;

  return (
    <button
      className={cn(buttonClassName, className)}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <img className="size-5" src="./spinner.png" alt="spinner" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

