import { Routes, Route } from "react-router-dom";

import { Home } from "@/pages/Home/Home";

import { Book } from "@/pages/Book/Books";

import { ProtectedRoutes } from "./Protected.routes";

import { AuthRoutes } from "@/routes/Auth.routes";

import { Error404 } from "@/common/error-boundary/error/404";

import SuccessFully from "@/common/error-boundary/on-success/index";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/store/reducers/auth";

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
      <Route path="/success" element={<SuccessFully />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};
