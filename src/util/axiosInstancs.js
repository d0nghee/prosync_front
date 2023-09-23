import axios from "axios";
import { redirect } from "react-router-dom";
import { setCookie, getCookie } from "./cookies";
import { useDispatch, useSelector } from "react-redux";
import { setEventSource, setIsConnected } from "../redux/reducers/eventSlice";
import { store } from '../redux/store/index'
import { connectSse, useSSE } from '../util/eventSource/useSse'

// const dispatch = () => {
//   return useDispatch();
// }

// const selector = () => {
//   return useSelector((state)=> state.event);
// }



export const axiosInstance = axios.create({
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
    // console.log(response);
    // console.log(response.request.responseURL)
    // const url = (response.request.responseURL).substr(28);
    // console.log(url);


    // if (url === "/removeToken") {

    //   store.dispatch(setEventSource(null));

    // } else if (url !== "/send_verification"
    //   && url !== "/verify_code"
    //   && url !== "/members"
    //   && url !== "/idcheck"
    //   && url !== "/login") {


    //   let eventSource = store.getState().eventSource.eventSource;

    //   if (!eventSource) {
    //     console.log(localStorage.getItem('memberId'))
    //     eventSource = connectSse(localStorage.getItem('memberId'));

    //   }


    //   eventSource.addEventListener("sse", function (event) {
    //     console.log(event.data);

    //     const data = JSON.parse(event.data);

    //     (async () => {
    //       // 브라우저 알림
    //       const showNotification = () => {

    //         const notification = new Notification('코드 봐줘', {
    //           body: data.content
    //         });

    //         setTimeout(() => {
    //           notification.close();
    //         }, 10 * 1000);

    //         notification.addEventListener('click', () => {
    //           window.open(data.url, '_blank');
    //         });
    //       }

    //       // 브라우저 알림 허용 권한
    //       let granted = false;

    //       if (Notification.permission === 'granted') {
    //         granted = true;
    //       } else if (Notification.permission !== 'denied') {
    //         let permission = await Notification.requestPermission();
    //         granted = permission === 'granted';
    //       }

    //       // 알림 보여주기
    //       if (granted) {
    //         showNotification();
    //       }
    //     })();
    //   })

    //   eventSource.addEventListener("error", function (event) {
    //     if (event.target.readyState === EventSource.CLOSED) {
    //       console.log("SSE closed");
    //     } else if (event.target.readyState === EventSource.CONNECTING) {
    //       console.log("SSE reconnecting");
    //     } else {
    //       console.error("SSE error:", event);
    //     }
    //   });
    // }

    return response;
  },
  async (error) => {
    const originalRequest = await error.config;
    const accessToken = getCookie("accessToken");

    if (error.response.headers && error.response.headers.authorization) {
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
    else if (error.response) {
      // 로그인 이후 사용 가능한 메뉴 -> 로그인 화면
      if (error.response.status === 401) {
        alert("로그인 이후 이용 가능한 메뉴입니다.");
        return redirect("/auth?mode=login");
      }
      // 권한 없는 메뉴 -> 홈화면
      else if (error.response.status === 403) {
        alert("해당 메뉴에 대한 접근 권한이 없습니다.");
        return redirect("/");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
