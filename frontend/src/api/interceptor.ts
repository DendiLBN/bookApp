import axios from "axios";
// import { setTokens } from "common/utils/setTokens";

export const authorizedApi = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("AccessToken from localStorage:", accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log("Added Authorization header:", config.headers);
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);
