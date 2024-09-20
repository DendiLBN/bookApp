import axiosBaseQuery from "@/common/vendors/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

import { TRegisterUserResponse } from "@/types/api/user";
import { TFetchBodyRegister } from "@/types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({
    registerUser: builder.mutation<TRegisterUserResponse, TFetchBodyRegister>({
      query: (data) => ({
        method: "POST",
        url: `auth/register/`,
        data,
      }),
    }),
    // TODO - podmienić typy
    loginUser: builder.mutation<TRegisterUserResponse, TFetchBodyRegister>({
      query: (data) => ({
        method: "POST",
        url: `auth/login/`,
        data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
