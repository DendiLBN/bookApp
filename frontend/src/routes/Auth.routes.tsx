import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = lazy(() => import("@/pages/Auth/Register"));

export const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};
