import React from "react";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex h-fit justify-center items-center m-4 sm:m-10">
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md w-100 px-4 sm:px-10 py-10 ">
        <Outlet />
      </div>
    </div>
  );
};
