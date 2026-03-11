import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { loggedInUser, authChecked } = useSelector((state) => state.auth);

  console.log({ loggedInUser, authChecked });

  if (!authChecked) {
    return (
      <div className="text-center mt-40 text-xl font-bold">
        Checking authentication...
      </div>
    );
  }

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
