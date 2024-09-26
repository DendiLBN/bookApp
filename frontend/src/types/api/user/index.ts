export type TRegisterUserResponse = {
  firstName: string;
  email: string;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLogOutUserResponse = TLoginUserResponse;

export type IUser = {
  _id: string;
  email: string;
};

export type TUserData = {
  user: IUser;
  password: string;
};
