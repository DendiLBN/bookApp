import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home/Home";

import { useIsLoggedIn } from "@/common/hooks/use-is-logged-in";

export const PrivateRoutes = () => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
