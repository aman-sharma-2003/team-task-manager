import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../features/authSlice";
import { Button } from "./ui/Button";

const Navbar = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10  py-4 bg-gray-400 text-white">
      <h2
        className="text-xl hover:text-gray-300 font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Team Task Manager
      </h2>

      <div className="flex items-center gap-2 sm:gap-6">
        {loggedInUser ? (
          <>
            {/* <button
              onClick={() => navigate("/booking-details")}
              className="hover:text-gray-300 cursor-pointer w-32"
            >
              {loggedInUser?.role === "admin"
                ? "Users Bookings"
                : "My Bookings"}
            </button> */}

            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                {loggedInUser?.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:block min-w-fit">
                {loggedInUser?.name}
              </span>
            </div>
            <Button
              className="max-w-18 py-1 px-2"
              isLoading={loading}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className="max-w-18 py-1 px-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
