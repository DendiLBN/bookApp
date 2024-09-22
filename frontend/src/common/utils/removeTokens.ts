import { ACCESS_TOKEN, REFRESH_TOKEN } from "../consts/local-storage";

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
