import { userApi } from "./user";

export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
};

export const apiMiddlewares = [userApi.middleware];
