import { AxiosError } from "axios";

export const tryFunc =
  (fun, onSuccess, errorHandlers = {}) =>
  async (...args) => {
    try {
      const result = await fun(...args);
      console.log("api 호출 결과: ");
      if (result instanceof AxiosError) {
        throw result;
      } else if (result.response && result.response instanceof AxiosError) {
        throw result.response;
      }
      onSuccess(result);
    } catch (error) {
      console.log(error);
      console.log("tryFuc 에러 ");
      const status = error.response && error.response.status;

      if (errorHandlers[status]) {
        errorHandlers[status](error);
      } else {
        if (error.message === "Network Error") {
          alert("네트워크 장애가 발생했습니다.");
        }
        console.log("Unhandled Error", error);
      }
    }
  };
