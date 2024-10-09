import axiosBaseQuery from "@/common/services/axios-base-query";

import { TUserState } from "@/store/reducers/users";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<TUserState, void>({
      query: () => ({
        method: "GET",
        url: "users/me",
      }),
    }),
  }),
});

export const { useFetchUsersQuery } = userApi;
