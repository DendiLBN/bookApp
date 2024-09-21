import axiosBaseQuery from "@/common/vendors/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

import { setIsLoggedIn } from "../../reducers/user";

import { TLoginUserResponse, TRegisterUserResponse } from "@/types/api/user";
import { TRegisterUserRequestBody, TLoginUserRequestBody } from "@/types/types";
import { setTokens } from "@/common/utils/setTokens";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      TRegisterUserResponse,
      TRegisterUserRequestBody
    >({
      query: (data) => ({
        method: "POST",
        url: `auth/register/`,
        data,
      }),
    }),
    loginUser: builder.mutation<TLoginUserResponse, TLoginUserRequestBody>({
      query: (data) => ({
        method: "POST",
        url: `auth/login/`,
        data,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            const accessToken = response.data.accessToken;

            setTokens({
              accessToken,
            });
          }

          dispatch(setIsLoggedIn(true));
        } catch (error) {
          return;
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
