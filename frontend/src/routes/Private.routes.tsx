import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

const LoginTestTest = lazy(() => import("@/pages/Auth/loginTest"));

export const PrivateRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="loginTest" element={<LoginTestTest />} />
    </Routes>
  </Suspense>
);
