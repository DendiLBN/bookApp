import { Routes, Route } from "react-router-dom";

import { Home } from "@/pages/Home/Home";

import { Book } from "@/pages/Book/Books";

import { AuthRoutes } from "@/routes/Auth.routes";

import { ProtectedRoutes } from "./Protected.routes";

import { Error404 } from "@/common/error-boundary/error/404";

export const LandingPageRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book" element={<Book />} />

      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/protected/*" element={<ProtectedRoutes />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
