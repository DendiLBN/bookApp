import { ACCESS_TOKEN } from "../consts/local-storage";

import { TTokens } from "@/types/types";

export const setTokens = (tokens: TTokens) => {
  localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
  console.log("token setup correctly in localStorage", tokens.accessToken);
};
