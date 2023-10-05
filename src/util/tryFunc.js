import { AxiosError } from "axios";
import { escape } from "lodash";
import { setError } from "../redux/reducers/error-slice";
import { darkScrollbar } from "@mui/material";

export const tryFunc =
  (fun, onSuccess, dispatch) =>
  async (...args) => {
    try {
      console.log("tryFunc 내부 dispatch");
      console.log(typeof dispatch);
      const result = await fun(...args);
      console.log("api 호출 결과: ");
      console.log(result);
      if (result.response && result.response instanceof AxiosError) {
        throw result.response;
      }
      onSuccess(result);
    } catch (error) {
      console.log(error);
      console.log("tryFuc 에러 ");

      if (error === undefined) {
        console.error("An undefined error occured!");
        alert("알 수 없는 오류가 발생했습니다.");
      } else if (error.code === "ERR_NETWORK") {
        // 네트워크 에러에 대한 처리
        console.error("네트워크 에러 발생:", error);
      } else {
        const status = error.response && error.response.status;
        const resultCode =
          error.response &&
          error.response.data &&
          error.response.data.resultCode;

        if (status) {
          switch (status) {
            case 400: // BAD_REQUEST
              switch (resultCode) {
                case "INVALID_ENUM_VALUE": // HttpMessageNotReadableException
                  dispatch(
                    setError({
                      errorData: { status, resultCode },
                      errorMessage: "유효하지 않은 ENUM 값입니다.",
                    })
                  );
                  break;
                case "INVALID_EMAIL": // 유효하지 않은 이메일 주소
                  dispatch(
                    setError(
                      { status, resultCode },
                      "유효하지 않은 이메일 주소입니다."
                    )
                  );
                  break;
                case "CERTIFICATION_NUMBER_MISMATCH": // 이메일 인증 번호 불일치
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이메일 인증 번호가 일치하지않습니다."
                    )
                  );

                  break;
                case "NOTIFICATION_CANT_READ": // 알림 수정 불가
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 알림을 수정하실 수 없습니다."
                    )
                  );

                  break;
                case "NOTIFICATION_CANT_DELETE": // 알림 삭제 불가
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 알림을 삭제하실 수 없습니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [BAD_REQUEST]"
                    )
                  );
                  break;
              }
              break;

            case 401: // UNAUTHORIZED
              switch (resultCode) {
                case "UNAUTHORIZED": // 유저 인증 실패
                  dispatch(
                    setError({
                      errorData: { status, resultCode },
                      errorMessage:
                        "사용자 인증에 실패하셨습니다. 로그인 페이지로 이동합니다.",
                    })
                  );

                  break;
                case "INVALID_TOKEN": // 토큰 유효성 검사 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "사용자 인증에 실패하셨습니다. 로그인 페이지로 이동합니다."
                    )
                  );

                  break;
                case "INVALID_REFRESH_TOKEN": // 리프레시 토큰 유효성 검사 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "사용자 인증에 실패하셨습니다. 로그인 페이지로 이동합니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알수 없는 오류가 발생했습니다. [UNAUTHORIZED]"
                    )
                  );

                  break;
              }
              break;

            case 403: // FORBIDDEN
              switch (resultCode) {
                case "ACCESS_FORBIDDEN": // 프로젝트 위임 후 나가기, 댓글 수정/삭제 시
                  dispatch(
                    setError({ status, resultCode }, "ACCESS_FORBIDDEN")
                  );

                  break;
                case "INVALID_FILE_TYPE": // 파일 형식 오류
                  dispatch(
                    setError(
                      { status, resultCode },
                      "파일 형식이 잘못되었습니다."
                    )
                  );

                  break;
                case "NOTIFICATION_CANT_READ": // 알림 읽기 권한 없음
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 알림을 읽으실 수 없습니다."
                    )
                  );

                  break;
                case "MEMBER_NOT_INCLUDED_IN_PROJECT": // 프로젝트 내 회원 존재 X (권한 X)
                  dispatch(
                    setError(
                      { status, resultCode },
                      "프로젝트의 회원이 아니십니다."
                    )
                  );

                  break;
                case "INAPPROPRIATE_PERMISSION": // 인증되지 않은 사용자(ADMIN이 아닌)
                  dispatch(
                    setError(
                      { status, resultCode },
                      "프로젝트의 관리자가 아니라 해당 메뉴를 사용하실 수 없습니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [FORBIDDEN]"
                    )
                  );

                  break;
              }
              break;

            case 404: // NOT_FOUND
              switch (resultCode) {
                case "USER_NOT_FOUND": // 회원 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 회원 정보를 찾을 수 없습니다"
                    )
                  );

                  break;
                case "PROJECT_NOT_FOUND": // 프로젝트 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 프로젝트 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "PROJECT_LINK_NOT_FOUND": // 프로젝트 링크 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 프로젝트 링크 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "PROJECT_MEMBER_NOT_FOUND": // 프로젝트 멤버 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 프로젝트 멤버 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "PROJECT_INVITE_CODE_NOT_FOUND": // 프로젝트 초대 코드 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 프로젝트 초대 코드 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "TASK_NOT_FOUND": // 업무 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 업무 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "TASK_MEMBER_NOT_FOUND": // 업무 멤버 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 업무 멤버 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "TASK_STATUS_NOT_FOUND": // 업무 상태 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 업무 상태를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "FILE_NOT_FOUND": // 파일 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 파일 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                case "NOTIFICATION_NOT_FOUND": // 알림 리소스 찾기 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "해당 알림 정보를 찾을 수 없습니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [NOT_FOUND]"
                    )
                  );

                  break;
              }
              break;

            case 409: // CONFLICT
              switch (resultCode) {
                case "DUPLICATED_USER_ID": // 중복된 회원
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 가입된 회원이 존재합니다."
                    )
                  );
                  break;
                case "PROJECT_EXISTS": // 프로젝트 리소스 존재
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 생성된 프로젝트가 존재합니다."
                    )
                  );

                  break;
                case "PROJECT_MEMBER_EXISTS": // 프로젝트 멤버 리소스 존재
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 생성된 프로젝트 멤버가 존재합니다."
                    )
                  );

                  break;
                case "TASK_EXISTS": // 업무 리소스 존재
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 생성된 업무가 존재합니다."
                    )
                  );

                  break;
                case "TASK_MEMBER_EXISTS": // 업무 멤버 리소스 존재
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 생성된 업무 멤버가 존재합니다."
                    )
                  );

                  break;
                case "FILE_INFO_EXISTS": // 파일 정보 리소스 존재
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이미 생성된 파일이 존재합니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [CONFLICT]"
                    )
                  );

                  break;
              }
              break;

            case 422: // UNPROCESSABLE_ENTITY
              switch (resultCode) {
                case "INCORRECT_FORMAT_EMAIL": // 이메일 형식 불일치
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이메일 형식이 맞지 않습니다."
                    )
                  );

                  break;
                case "INCORRECT_FORMAT_NAME": // 이름 형식 불일치
                  dispatch(
                    setError(
                      { status, resultCode },
                      "이름 형식이 맞지 않습니다."
                    )
                  );

                  break;
                case "INCORRECT_FORMAT_PASSWORD": // 비밀번호 형식 불일치
                  dispatch(
                    setError(
                      { status, resultCode },
                      "비밀번호 형식이 맞지 않습니다."
                    )
                  );

                  break;
                case "INCORRECT_FORMAT_INTRO": // 소개글 형식 불일치
                  dispatch(
                    setError(
                      { status, resultCode },
                      "소개글 형식이 맞지 않습니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [UNPROCESSABLE_ENTITY]"
                    )
                  );

                  break;
              }
              break;

            case 500: // INTERNAL_SERVER_ERROR
              switch (resultCode) {
                case "INTERNAL_SERVER_ERROR": // 내부 서버 에러
                  dispatch(
                    setError(
                      { status, resultCode },
                      "내부 서버 에러가 발생하였습니다."
                    )
                  );

                  break;
                case "EMAIL_NOT_SENT": // 내부 서버 에러로 인한 이메일 전송 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "내부 서버 에러로 인해 이메일 전송이 실패하였습니다."
                    )
                  );

                  break;
                case "CRYPT_ERROR": // 내부 서버 에러로 인한 암호화 실패
                  dispatch(
                    setError(
                      { status, resultCode },
                      "내부 서버 에러로 인해 암호화 실패하였습니다."
                    )
                  );

                  break;
                default:
                  dispatch(
                    setError(
                      { status, resultCode },
                      "알 수 없는 오류가 발생했습니다. [INTERNAL_SERVER_ERROR]"
                    )
                  );

                  break;
              }
              break;

            default:
              dispatch(
                setError({ status, resultCode }, "원인을 알 수 없는 오류 발생]")
              );

              break;
          }
        }
      }
    }
  };
