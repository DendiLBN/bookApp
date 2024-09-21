import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";
import { AuthRoutes } from "@/routes/Auth.routes";
import { PrivateRoutes } from "./Private.routes";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/book" element={<Book />} />
    <Route path="/auth/*" element={<AuthRoutes />} />
    <Route path="/auth/*" element={<AuthRoutes />} />
    <Route path="/private/*" element={<PrivateRoutes />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const NotFound: React.FC = () => {
  return <div>404 - Page Not Found</div>;
};
