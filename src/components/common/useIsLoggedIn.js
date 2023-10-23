import { useEffect } from "react";
import { getCookie } from "../../util/cookies";

let initialDelay = 1000; // 1초
let maxDelay = 120000; // 120초

function initializeEventSource(setEventSource, addToast, timerIds) {
  const memberId = getCookie("memberId");
  const newEventSource = new EventSource(
    `http://13.209.219.235:8080/api/v1/subscribe/${memberId}`
    // `http://localhost:8080/api/v1/subscribe/${memberId}`
  );

  newEventSource.addEventListener("open", () => {
    console.log("SSE 연결 성공");
    initialDelay = 1000;
  });

  // 정상적인 알람 메시지 도착
  newEventSource.addEventListener("sse", (event) => {
    console.log(event.data);

    let data = JSON.parse(event.data);

    if (!data.isCountMessage) {
      data = data.notificationResponse;
    }

    const currentTimerId = addToast(data);
    timerIds.push(currentTimerId);
  });

  // 서버에서 구독, 전송 오류 전달
  newEventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "error") {
      if (data.message === "SSE 구독 오류 발생") {
        console.log("구독 오류");
        reconnectWithBackoff(initialDelay, setEventSource, addToast, timerIds);
      } else if (data.message === "SSE 전송 오류 발생") {
        console.log("전송 오류");
        alert("알림 전송 오류가 발생했습니다. 새로고침을 눌러주세요.");
      }
    }
  };

  // 네트워크 문제나 서버의 연결 종료 등으로 인해 연결이 끊어진 경우(서버의 500 응답 또는 무응답)
  newEventSource.addEventListener("error", function (event) {
    console.log("eventSource 에러 발생");
    console.log(event);
    if (event.target.readyState === EventSource.CLOSED) {
      console.log("SSE closed");
      reconnectWithBackoff(initialDelay, setEventSource, addToast, timerIds);
    } else if (event.target.readyState === EventSource.CONNECTING) {
      console.log("SSE reconnecting");
    } else {
      console.error("SSE error:", event);
    }
  });

  setEventSource(newEventSource);
}

function reconnectWithBackoff(delay, setEventSource, addToast, timerIds) {
  setTimeout(() => {
    console.log(`재연결 시도. 대기 시간: ${delay}ms`);
    initializeEventSource(setEventSource, addToast, timerIds);
    if (delay < maxDelay) {
      initialDelay *= 2;
    }
  }, delay);
}

export function useIsLoggedIn(
  isLoggedIn,
  eventSource,
  setEventSource,
  addToast
) {
  useEffect(() => {
    const timerIds = [];

    if (isLoggedIn && !eventSource) {
      console.log("eventSource");
      initializeEventSource(setEventSource, addToast, timerIds);
    } else if (!isLoggedIn && eventSource) {
      eventSource.close();
      setEventSource(null);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      timerIds.forEach((id) => clearTimeout(id));
    };
  }, [isLoggedIn, eventSource]);
}
