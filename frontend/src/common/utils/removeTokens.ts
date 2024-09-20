export const removeTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
