import { LoginForm } from "@/components/account-view/login-form";

import { BookFormContextProvider } from "@/context/book-store-context";

export const Login = () => (
  <>
    <BookFormContextProvider>
      <LoginForm />
    </BookFormContextProvider>
  </>
);
