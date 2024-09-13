import { useContext } from "react";

import { AuthContext, TAuthContextForm } from "@/context/auth-data-context";

export const useAuthFormContext = (): TAuthContextForm => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error(
      " useBooksFormContext must be used within a TAuthContextFormProvider"
    );
  }

  return ctx;
};
