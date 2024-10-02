import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";
import { AuthRoutes } from "@/routes/Auth.routes";
import { ProtectedRoutes } from "./Protected.routes";
import { Error404 } from "@/common/error-boundary/error/404";
import SuccessFully from "@/common/error-boundary/on-success/index";
import Register from "@/pages/Auth/Register";
import useUser from "@/common/users";

export const LandingPageRouting = () => {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();

  useEffect(() => {
    if (!user) {
      refetchUser();
      navigate("/auth/login");
    }
  }, [user, refetchUser, navigate]);

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={!user ? <AuthRoutes /> : <Navigate to="/protected" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/protected" replace />}
      />
      <Route
        path="/protected/*"
        element={
          user ? <ProtectedRoutes /> : <Navigate to="/auth/login" replace />
        }
      />
      <Route path="/*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book" element={<Book />} />
      <Route path="/success" element={<SuccessFully />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
