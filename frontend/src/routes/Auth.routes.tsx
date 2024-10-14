import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

const LoginPage = lazy(() => import("@/pages/Auth/Login"));

const RegisterPage = lazy(() => import("@/pages/Auth/Register"));

export const AuthRoutes = () => {
  const { loading } = useNotificationContext();

  if (loading) return;

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};
export default AuthRoutes;
