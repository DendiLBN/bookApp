import { Key } from "react";
import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/common/vendors/axios-base-query";

import { TBookBodyParams, TBookBodyResponse } from "@/types/api/books";

type TBookBodyTransformResponse = TBookBodyResponse[];

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({
    fetchBooks: builder.query<TBookBodyResponse[], TBookBodyParams>({
      query: ({ page = 1, perPage = 100, category = [], searchString }) => ({
        method: "GET",
        url: "books",
        params: {
          page,
          searchString,
          perPage,
          category,
        },
      }),
      transformResponse: ({ data }: { data: TBookBodyTransformResponse }) =>
        data || [],

      providesTags: [],
    }),
    deleteBooks: builder.mutation<void, Key[]>({
      query: (ids) => ({
        method: "POST",
        url: "/books/delete-multiple-id",
        data: { ids },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useFetchBooksQuery, useDeleteBooksMutation } = bookApi;
