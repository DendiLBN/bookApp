import { Suspense } from "react";

import { Routes } from "react-router-dom";

export const PrivateRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes></Routes>
  </Suspense>
);
