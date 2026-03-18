import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../features/authSlice";
import { Button } from "./ui/Button";

const Navbar = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10  py-3 bg-[#473699] text-white">
      <div
        className="flex flex-row gap-2 items-center justify-center cursor-pointer"
        onClick={() => navigate("/home")}
        title="Click to go to home and see My Boards"
      >
        <div>
          <img className="size-7" src="/logo.png" alt="logo" />
        </div>
        <h2 className="text-[19px] hover:text-gray-300 font-bold">
          Team Task Manager
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {loggedInUser ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <div className="size-6 rounded-full bg-[#de350b] flex items-center justify-center font-bold">
                {loggedInUser?.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden text-[14px] sm:block min-w-fit">
                {loggedInUser?.name}
              </span>
            </div>
            <Button
              className="w-18 py-0.5 px-1 text-[15px] rounded-md"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className="w-18 py-0.5 px-1 text-[15px] rounded-md"
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
