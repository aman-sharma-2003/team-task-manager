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
import { setLoading } from "./features/statusSlice";

const App = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  // const { loading } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const { authChecked } = useSelector((state) => state.auth);


 useEffect(() => {
   dispatch(checkAuth());
 }, []);
  
  if (!authChecked) {
    return (
      <div className="text-center mt-40 text-xl font-bold">
        Checking authentication...
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen max-h-fit bg-gray-200">
        <Navbar />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/board/new" element={<Board />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
