import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";
import { AuthRoutes } from "@/routes/Auth.routes";
import { ProtectedRoutes } from "./Protected.routes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/common/store/reducers/user";

export const LandingPageRouting = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book" element={<Book />} />

      {!isLoggedIn && <Route path="/auth/*" element={<AuthRoutes />} />}
      {!isLoggedIn && <Route path="/private/*" element={<ProtectedRoutes />} />}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
// TODO ADD ERROR BOUNDARIES FOR NOT FOUND PAGE
const NotFound: React.FC = () => {
  return <div>404 - Page Not Found</div>;
};
