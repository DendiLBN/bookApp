import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import { Home } from "@/pages/Home/Home";

import { Book } from "@/pages/Book/Books";

import { ProtectedRoutes } from "./Protected.routes";

import { AuthRoutes } from "@/routes/Auth.routes";

import { selectIsLoggedIn } from "@/store/reducers/auth";

import { Error404 } from "@/common/error-boundary/error/404";

import OnSuccessRegister from "@/features/register-page/results";

export const LandingPageRouting = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      {!isLoggedIn && <Route path="/auth/*" element={<AuthRoutes />} />}
      {isLoggedIn && (
        <Route path="/protected/*" element={<ProtectedRoutes />} />
      )}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book" element={<Book />} />
      <Route path="/success" element={<OnSuccessRegister />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};
