import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";

import { Login } from "@/pages/Account/Login-view";
import { Register } from "@/pages/Account/Register";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Book" element={<Book />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<Register />} />
  </Routes>
);

const NotFound: React.FC = () => {
  return <div>404 - Page Not Found</div>;
};
