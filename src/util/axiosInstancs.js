import axios from "axios";
import { setCookie, getCookie } from "./cookies";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && refreshToken) {
      config.headers["Authorization"] = accessToken;
      config.headers["Refresh"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log(response);

    return response;
  },
  async (error) => {
    console.log(error.response.data, "data");
    const originalRequest = await error.config;

    const accessToken = getCookie("accessToken");

    if (error.response.headers && error.response.headers.authorization) {
      const newToken = error.response.headers.authorization;

      if (newToken) {
        originalRequest.headers.authorization = newToken;
        setCookie("accessToken", newToken, { path: "/" });
        return axiosInstance(originalRequest);
      } else if (error.response.status === 401 && accessToken) {
        //토큰 만료 상태 코드
        setCookie("accessToken", "EXPIRED", { path: "/" });
      } else if (error.response.status === 401) {
        // TODO: 비로그인 사용자가 권한 필요한 곳에 방문했을때 처리 (로그인 화면으로..)
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
