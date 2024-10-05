import axiosBaseQuery from "@/common/vendors/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { logOutUser, setIsLoggedIn } from "../../reducers/auth";
import {
  TLoginUserResponse,
  TLogOutUserResponse,
  TRegisterUserResponse,
} from "@/types/api/auth-user";
import {
  TLoginUserParams,
  TLogoutUserParams,
  TRegisterUserParams,
} from "@/types/types";
import { setTokens } from "@/common/utils/setTokens";
import { userApi } from "../users";
import { clearUser } from "@/store/reducers/users";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation<TRegisterUserResponse, TRegisterUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/register/`,
        data,
      }),
      async onQueryStarted({ onSuccess, onError }, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          onSuccess(response.data);
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
      async onQueryStarted(
        { onSuccess, onError },
        { dispatch, queryFulfilled }
      ) {
        try {
          const response = await queryFulfilled;

          if (!response) return;

          const { accessToken, refreshToken } = response.data;
          setTokens({ accessToken, refreshToken });

          const userResponse = await dispatch(
            userApi.endpoints.fetchUsers.initiate()
          );

          if (userResponse?.data) {
            dispatch(
              setIsLoggedIn({ isLoggedIn: true, user: userResponse?.data })
            );
          }
          onSuccess(response.data);
        } catch (error) {
          onError();
        }
      },
    }),

    logOutUser: builder.mutation<TLogOutUserResponse, TLogoutUserParams>({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        return {
          method: "POST",
          url: `auth/logout/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: { refreshToken },
        };
      },

      onQueryStarted: async (
        { onSuccess, onError },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            onSuccess();
            dispatch(clearUser());
            dispatch(logOutUser());
            dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
          }
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
  useLogOutUserMutation,
} = authApi;
