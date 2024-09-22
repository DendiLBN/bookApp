import { ACCESS_TOKEN } from "../consts/local-storage";

import { TTokens } from "@/types/types";

export const setTokens = (tokens: TTokens) => {
  localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
};
