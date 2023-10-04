import axios from "axios";
import { redirect } from "react-router-dom";
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
    const originalRequest = await error.config;
    const accessToken = getCookie("accessToken");

    if (error.response && error.response.headers.authorization) {
      // 헤더에 새 토큰이 있을 경우 - 토큰 변경 및 기존 요청을 재요청
      const newToken = error.response.headers.authorization;
      if (newToken) {
        originalRequest.headers.authorization = newToken;
        setCookie("accessToken", newToken, { path: "/" });
        return axiosInstance(originalRequest);
      }
      //리프레시 토큰 만료시 - 로그아웃 처리
      else if (error.response.status === 401 && accessToken) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        setCookie("accessToken", "EXPIRED", { path: "/" });
        return redirect("/");
      }
    }
    // 접근 불가 메뉴일 경우
    // else if (error.response) {
    //   // 로그인 이후 사용 가능한 메뉴 -> 로그인 화면
    //   if (error.response.status === 401) {
    //     alert("로그인 이후 이용 가능한 메뉴입니다.");
    //     return redirect("/auth?mode=login");
    //   }
    //   // 권한 없는 메뉴 -> 홈화면
    //   else if (error.response.status === 403) {
    //     alert("해당 메뉴에 대한 접근 권한이 없습니다.");
    //     return redirect("/");
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
