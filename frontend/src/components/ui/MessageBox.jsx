import React from "react";
import { cn } from "../../utils/style";

export const ErrorMessage = ({ errorMessage, authError }) => {
  if (!errorMessage) return null;

  return (
    <p
      className={cn(
        "text-red-500 text-xs font-medium",
        authError && "text-center text-sm"
      )}
    >
      {errorMessage}
    </p>
  );
};

export const SuccessMessage = ({ successMessage }) => {
  if (!successMessage) return null;

  return (
    <p className={cn("text-green-500  text-center text-sm font-medium")}>
      {successMessage}
    </p>
  );
};
