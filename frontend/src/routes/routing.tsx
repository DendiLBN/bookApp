import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";
import { LoginFormPage } from "@/components/account-view/login-form-page";
import { RegisterFormPage } from "@/components/account-view/register-form-page";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Book" element={<Book />} />
    <Route path="RegisterForm" element={<RegisterFormPage />} />
    <Route path="LoginForm" element={<LoginFormPage />} />
  </Routes>
);

const NotFound: React.FC = () => {
  return <div>404 - Page Not Found</div>;
};
