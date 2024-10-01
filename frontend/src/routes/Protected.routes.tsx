import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home/Home";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

export const ProtectedRoutes = () => {
  const { loading } = useNotificationContext();

  if (loading) return;

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
