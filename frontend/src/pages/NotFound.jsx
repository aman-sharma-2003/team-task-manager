import { Link } from "react-router";
import React from "react";

const NotFound=()=> {
  return (
    <div className="h-40 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 Page Not Found</h1>

      <Link to="/" className="text-blue-500 mt-4 font-medium">
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
