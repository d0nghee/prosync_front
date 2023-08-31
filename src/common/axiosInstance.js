import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    Authorization: localStorage.getItem("accessToken"),
    Refresh: localStorage.getItem("refreshToken"),
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers["Authorization"] = localStorage.getItem("accessToken");
//     config.headers["Refresh"] = localStorage.getItem("refreshToken");
//     return config;
//   },
//   (error) => {
//     console.log("error", error.response);
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["authorization"];
    const refreshToken = response.headers["refresh"];
    if (accessToken) {
      console.log("-- access token 재발급 --");
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      console.log("로그인 성공!");
      localStorage.setItem("refreshToken", refreshToken);
    }
    return response;
  },
  (error) => {
    console.log(error);
    //토큰 만료 상태 코드
    if (error.response.status === 401) {
      localStorage.setItem("accessToken", "EXPIRED");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
