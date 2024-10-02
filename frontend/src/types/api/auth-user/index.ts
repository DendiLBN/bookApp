export type TRegisterUserResponse = {
  firstName: string;
  email: string;
};

export type TLoginUserResponseData = {
  email: string;
  firstName: string;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLogOutUserResponse = {
  accessToken: string;
  refreshToken: string;
};
