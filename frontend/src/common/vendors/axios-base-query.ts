import axios from "axios";
import { AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig } from "axios";

import { ACCESS_TOKEN } from "../consts/local-storage";

export type TBaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: import.meta.env.VITE_BASE_URL,
    }
  ): BaseQueryFn<TBaseQueryParams, unknown, unknown> =>
  async ({ method, url, data, params, headers: additionalHeader }) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN);

    let headers = { ...additionalHeader };

    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const source = axios.CancelToken.source();

    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        cancelToken: source.token,
      });

      return { data: result.data, meta: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
