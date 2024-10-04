import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../consts/local-storage";
import { setTokens } from "../utils/setTokens";

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
    let token = window.localStorage.getItem(ACCESS_TOKEN);

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

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      // TODO ONLY IF USER GET RESPONSE 401 TOKEN WILL BE REQUESTED EXTENDED
      if (err.response?.status === 401) {
        const originalRequest = err.config;

        if (!originalRequest) {
          return {
            error: {
              status: err.response.status,
              data: "Original request not found",
            },
          };
        }

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
          return {
            error: {
              status: err.response.status,
              data: "Refresh token not found",
            },
          };
        }

        try {
          const res = await axios.post("/api/auth/refresh-token", {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          const response = res.data;
          console.log(response);
          setTokens(response);

          token = response.accessToken;
          originalRequest.headers["Authorization"] = `Bearer ${token}`;

          const retryResult = await axios(originalRequest);

          console.log(originalRequest);

          return { retryResult };
        } catch (refreshError) {
          return {
            error: {
              status: (refreshError as AxiosError).response?.status,
              data:
                (refreshError as AxiosError).response?.data ||
                "Failed to refresh token",
            },
          };
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
