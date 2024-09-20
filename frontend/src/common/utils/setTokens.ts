import { ACCESS_TOKEN } from "../consts/local-storage";

import { ITokens } from "@/types/types";

export const setTokens = (tokens: ITokens) => {
  localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
  console.log("token setup correctly in localStorage", tokens.accessToken);
};
