
import { useRouteLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../../util/cookies';



export function useIsLoggedIn(isLoggedIn,eventSource, setEventSource,addToast) {
  
    useEffect(() => {
  
      const timerIds = [];
  
      if (isLoggedIn) {
        if (!eventSource) {
          console.log('eventSource')
          const memberId = getCookie("memberId");
          const newEventSource = new EventSource(
            `http://localhost:8080/api/v1/subscribe/${memberId}`
          );
          setEventSource(newEventSource);
  
          newEventSource.addEventListener("sse", (event) => {
            console.log(event.data);
  
            let data = JSON.parse(event.data);
  
            if (!data.isCountMessage) {
              data = data.notificationResponse;
            }
  
            const currentTimerId = addToast(data);
            timerIds.push(currentTimerId);
  
          });
  
          newEventSource.addEventListener("error", function (event) {
            console.log("eventSource 에러 발생");
            console.log(event);
            if (event.target.readyState === EventSource.CLOSED) {
              console.log("SSE closed");
            } else if (event.target.readyState === EventSource.CONNECTING) {
              console.log("SSE reconnecting");
            } else {
              console.error("SSE error:", event);
            }
          });
        }
      } else {
        if (eventSource) {
          eventSource.close();
          setEventSource(null);
        }
      }
  
      return () => {
        timerIds.forEach(id => clearTimeout(id));
      }
    }, [isLoggedIn]);
  
  }