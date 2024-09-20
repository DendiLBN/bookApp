import { ACCESS_TOKEN } from "../consts/local-storage";

export const removeTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem("refreshToken");
};
