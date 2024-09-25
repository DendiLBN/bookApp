import axiosBaseQuery from "@/common/vendors/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

import { logoutUser, setIsLoggedIn } from "../../reducers/user";

import {
  TLoginUserResponse,
  TLogoutUserResponse,
  TRegisterUserResponse,
} from "@/types/api/user";
import {
  TLoginUserParams,
  TLogoutUserParams,
  TRegisterUserParams,
} from "@/types/types";
import { setTokens } from "@/common/utils/setTokens";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({
    registerUser: builder.mutation<TRegisterUserResponse, TRegisterUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/register/`,
        data,
      }),
      onQueryStarted: async ({ onSuccess, onError }, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            onSuccess(response.data);
          }
        } catch (error) {
          onError();
        }
      },
    }),
    loginUser: builder.mutation<TLoginUserResponse, TLoginUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/login/`,
        data,
      }),
      onQueryStarted: async (
        { onSuccess, onError },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            const accessToken = response.data.accessToken;

            setTokens({
              accessToken,
            });
            onSuccess(response.data);
          }

          dispatch(setIsLoggedIn(true));
        } catch (error) {
          onError();
          return;
        }
      },
    }),
    logoutUser: builder.mutation<TLogoutUserResponse, TLogoutUserParams>({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        return {
          method: "POST",
          url: `auth/logout/`,
          headers: {
            Authorization: `Bearer ${accessToken}, ${refreshToken} `,
          },
        };
      },
      onQueryStarted: async (
        { onSuccess, onError },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            dispatch(logoutUser());
            onSuccess();
          }

          dispatch(setIsLoggedIn(false));
        } catch (error) {
          onError();
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
