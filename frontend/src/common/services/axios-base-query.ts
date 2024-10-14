import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../consts/local-storage";
import { setTokens } from "../utils/setTokens";
import { removeTokens } from "../utils/removeTokens";

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
      const { data: result } = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        cancelToken: source.token,
      });

      return { data: result };
    } catch (error) {
      const err = error as AxiosError;

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

        console.log("Sending refresh token request with:", refreshToken);

        try {
          const res = await axios.post(`/api/auth/refresh-token`, null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          console.log("Response from refresh token request:", res.data);

          const response = res.data;

          setTokens(response);

          token = response.accessToken;

          console.log("Response from refresh token:", response);

          console.log(
            "Retrying original request with new access token:",
            token
          );

          originalRequest.headers["Authorization"] = `Bearer ${token}`;

          console.log(response.accessToken, "new access token");

          const retryResult = await axios({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            },
          });

          return { data: retryResult.data };
        } catch (refreshError) {
          removeTokens();

          console.log(
            "Retrying original request with new access token:",
            token
          );

          return {
            error: {
              status: (refreshError as AxiosError).response?.status || 500,
              data:
                (refreshError as AxiosError).response?.data ||
                "Failed to refresh token",
            },
          };
        }
      }

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
