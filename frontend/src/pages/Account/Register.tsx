import { RegisterPage } from "@/features/Auth/Pages/RegisterPage/RegisterPage";

import { AuthContextProvider } from "@/context/auth-data-context";

export const Register = () => (
  <AuthContextProvider>
    <RegisterPage />
  </AuthContextProvider>
);

export default Register;
