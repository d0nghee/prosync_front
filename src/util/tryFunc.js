import { AxiosError } from 'axios';

export const tryFunc =
  (fun, onSuccess, errorHandlers = {}) =>
  async (...args) => {
    try {
      const result = await fun(...args);
      console.log('api 호출 결과: ');
      console.log(result);
      if (result.response && result.response instanceof AxiosError) {
        throw result.response;
      }
      onSuccess(result);
    } catch (error) {
      console.log(error);
      console.log('tryFuc 에러 ');
      const status = error.response && error.response.status;

      if (errorHandlers[status]) {
        errorHandlers[status](error);
      } else {
        console.log('Unhandled Error', error);
      }
    }
  };
