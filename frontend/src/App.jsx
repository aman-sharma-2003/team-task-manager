import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AuthLayout } from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { checkAuth } from "./features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Board from "./pages/Board";
// import { setLoading } from "./features/statusSlice";
import { useLocation } from "react-router";

const App = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  // const { loading } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const location = useLocation();
  const { authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname.startsWith("/reset-password")) {
      return;
    }
    dispatch(checkAuth());
  }, []);

  if (!authChecked) {
    if (!location.pathname.startsWith("/reset-password")) {
      return (
        <div className="text-center mt-40 text-xl font-bold">
          Checking authentication...
        </div>
      );
    }
  }
  return (
    <>
      <div className="min-h-screen max-h-fit bg-linear-to-br from-gray-100 to-slate-300 select-none">
        <Navbar />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/board/new" element={<Board />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
