import { original } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    //   Authorization: localStorage.getItem("accessToken"),
    //   Refresh: localStorage.getItem("refreshToken"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

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
  (response) => {
    console.log(response);

    return response;
  },
  (error) => {
    console.log(error.response.data);
    const originalRequest = error.config;
    const accessToken = error.response.headers.authorization;
    console.log("new token ==", accessToken);

    if (accessToken) {
      console.log("new token", accessToken);
      originalRequest.headers.authorization = accessToken;
      localStorage.setItem("accessToken", accessToken);
      return axiosInstance(originalRequest);
    } else if (error.response.status === 401) {
      //토큰 만료 상태 코드
      localStorage.setItem("accessToken", "EXPIRED");
    }
    return Promise.reject(error);
  }
);

function updateToken(newToken) {
  localStorage.setItem("accessToken", newToken);
}

export default axiosInstance;
