import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home/Home";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/common/store/reducers/user";

export const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  // TODO Add loading spinner
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
