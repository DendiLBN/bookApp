import { AuthContextProvider } from "@/context/auth-data-context";
import RegisterPage from "@/features/Pages/RegisterPage/RegisterPage";

export const Register = () => (
  <AuthContextProvider>
    <RegisterPage />
  </AuthContextProvider>
);

export default Register;
