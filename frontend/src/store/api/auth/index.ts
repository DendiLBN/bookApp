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
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log("User registered successfully!", response);
        } catch (error) {
          console.error("Error during registration:", error);
        }
      },
    }),

    loginUser: builder.mutation<TLoginUserResponse, TLoginUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/login/`,
        data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          if (!response) return;

          const { accessToken, refreshToken } = response.data;
          setTokens({ accessToken, refreshToken });

          const userResponse = await dispatch(
            userApi.endpoints.fetchUsers.initiate()
          );

          if (userResponse?.data) {
            dispatch(setIsLoggedIn(true));
          }
        } catch (error) {
          console.error("Error during login process:", error);
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

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          if (response) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            dispatch(clearUser());
            dispatch(logOutUser());
            dispatch(setIsLoggedIn(false));

            console.log("User logged out successfully!");
          }
        } catch (error) {
          console.error("Error during logout:", error);
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
