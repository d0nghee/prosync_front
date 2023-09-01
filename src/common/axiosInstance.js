import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    Authorization: localStorage.getItem("accessToken"),
    Refresh: localStorage.getItem("refreshToken"),
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["authorization"];
    const refreshToken = response.headers["refresh"];
    if (accessToken) {
      console.log("-- access token 발급 --");
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      console.log("-- refresh token 발급 --");
      localStorage.setItem("refreshToken", refreshToken);
    }
    //토큰 만료 상태 코드
    if (response.status === 401) {
      localStorage.setItem("accessToken", "EXPIRED");
    }

    return response;
  },
  (error) => {
    console.log(error.response.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
