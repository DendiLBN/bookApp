import { RegisterForm } from "@/components/account-view/register-form";

import { BookFormContextProvider } from "@/context/book-store-context";

export const Register = () => {
  return (
    <BookFormContextProvider>
      <RegisterForm />
    </BookFormContextProvider>
  );
};
