import { AuthContextProvider } from "@/context/auth-data-context";
import LoginPage from "@/features/Pages/LoginPage/LoginPage";

export const Login = () => (
  <>
    <AuthContextProvider>
      <LoginPage />
    </AuthContextProvider>
  </>
);
export default Login;
