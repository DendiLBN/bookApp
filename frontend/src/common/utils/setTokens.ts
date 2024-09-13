import { ITokens } from "@/types/types";

export const setTokens = (tokens: ITokens) => {
  localStorage.setItem("accessToken", tokens.accessToken);
  console.log("token setup correctly in localStorage", tokens.accessToken);
};
