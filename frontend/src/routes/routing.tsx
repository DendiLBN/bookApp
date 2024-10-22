import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import { Home } from "@/pages/Home/Home";

import { Book } from "@/pages/Book/Books";

import { selectIsLoggedIn } from "@/store/reducers/auth";

import { Error404 } from "@/common/error-boundary/error/404";

import OnSuccessRegister from "@/features/register-page/results";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

const AuthRoutes = lazy(() => import("@/routes/Auth.routes"));

const ProtectedRoutes = lazy(() => import("@/routes/Protected.routes"));

export const LandingPageRouting = () => {
  const { loading } = useNotificationContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/success" element={<OnSuccessRegister />} />
      <Route path="/*" element={<Error404 />} />

      {!isLoggedIn && (
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={loading}>
              <AuthRoutes />
            </Suspense>
          }
        />
      )}
      {isLoggedIn && (
        <Route
          path="/protected/*"
          element={
            <Suspense fallback={loading}>
              <ProtectedRoutes />
            </Suspense>
          }
        />
      )}
      {isLoggedIn && (
        <Route
          path="/book/*"
          element={
            <Suspense fallback={loading}>
              <Book />
            </Suspense>
          }
        />
      )}
    </Routes>
  );
};
