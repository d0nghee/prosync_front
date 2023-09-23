import { useEffect } from 'react';
import { setEventSource, setIsConnected } from '../../redux/reducers/eventSlice';
import { store } from '../../redux/store/index'


export function connectSse(memberId) {

  // 항상 동일한 endpoint를 사용하므로 함수 인자로 받지 않고 아래와 같이 고정값으로 사용
  const endpoint = `http://localhost:8080/api/v1/subscribe/${memberId}`;
  
    const eventSource = new EventSource(endpoint);

    eventSource.onopen = () => {
      store.dispatch(setEventSource(eventSource));
    };

    eventSource.onerror = (event) => {
      if (eventSource.readyState === EventSource.CLOSED) {
        store.dispatch(setEventSource(null));
      }
    };

  return store.getState().event;
}