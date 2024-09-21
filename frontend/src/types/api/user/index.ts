export type TRegisterUserResponse = {
  firstName: string;
  email: string;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
