import { setIsLoggedIn } from '../redux/reducers/member/loginSlice';

export const handleErrorCode = (
  status,
  resultCode,
  navigate,
  location,
  dispatch
) => {
  switch (status) {
    case 400: // BAD_REQUEST
      switch (resultCode) {
        case 'INVALID_ENUM_VALUE': // HttpMessageNotReadableException
          break;
        case "INVALID_EMAIL": // 유효하지 않은 이메일 주소
          break;
        case "CERTIFICATION_NUMBER_MISMATCH": // 이메일 인증 번호 불일치
          break;
        case "NOTIFICATION_CANT_READ": // 알림 수정 불가
          break;
        case "NOTIFICATION_CANT_DELETE": // 알림 삭제 불가
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 401: // UNAUTHORIZED
      switch (resultCode) {
        case 'UNAUTHORIZED': // 유저 인증 실패
          dispatch(setIsLoggedIn(false));
          if (
            location.pathname == '/auth' &&
            location.search.includes('?mode=login')
          ) {
            alert(
              '일치하는 계정 정보가 없습니다. 이메일 혹은 비밀번호를 다시 입력하세요.'
            );
          }
          break;
        case "INVALID_TOKEN": // 토큰 유효성 검사 실패
          break;
        case "INVALID_REFRESH_TOKEN": // 리프레시 토큰 유효성 검사 실패
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 403: // FORBIDDEN
      switch (resultCode) {
        case "ACCESS_FORBIDDEN": // 프로젝트 위임 후 나가기, 댓글 수정/삭제 시
          alert('메뉴에 대한 권한이 없습니다.');
          navigate('/');
          break;
        case "INVALID_FILE_TYPE": // 파일 형식 오류
          break;
        case "NOTIFICATION_CANT_READ": // 알림 읽기 권한 없음
          break;
        case 'MEMBER_NOT_INCLUDED_IN_PROJECT': // 프로젝트 내 회원 존재 X (권한 X)
          break;
        case "INAPPROPRIATE_PERMISSION": // 인증되지 않은 사용자(ADMIN이 아닌)
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 404: // NOT_FOUND
      switch (resultCode) {
        case "USER_NOT_FOUND": // 회원 리소스 찾기 실패
          alert("회원 정보를 찾지 못하였습니다.");
          break;
        case "PROJECT_NOT_FOUND": // 프로젝트 리소스 찾기 실패
          break;
        case "PROJECT_LINK_NOT_FOUND": // 프로젝트 링크 리소스 찾기 실패
          break;
        case "PROJECT_MEMBER_NOT_FOUND": // 프로젝트 멤버 리소스 찾기 실패
          break;
        case "PROJECT_INVITE_CODE_NOT_FOUND": // 프로젝트 초대 코드 리소스 찾기 실패
          break;
        case "TASK_NOT_FOUND": // 업무 리소스 찾기 실패
          break;
        case "TASK_MEMBER_NOT_FOUND": // 업무 멤버 리소스 찾기 실패
          break;
        case "TASK_STATUS_NOT_FOUND": // 업무 상태 리소스 찾기 실패
          break;
        case "FILE_NOT_FOUND": // 파일 리소스 찾기 실패
          break;
        case "NOTIFICATION_NOT_FOUND": // 알림 리소스 찾기 실패
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 409: // CONFLICT
      switch (resultCode) {
        case "DUPLICATED_USER_ID": // 중복된 회원
          break;
        case "PROJECT_EXISTS": // 프로젝트 리소스 존재
          break;
        case "PROJECT_MEMBER_EXISTS": // 프로젝트 멤버 리소스 존재
          break;
        case "TASK_EXISTS": // 업무 리소스 존재
          break;
        case "TASK_MEMBER_EXISTS": // 업무 멤버 리소스 존재
          break;
        case "FILE_INFO_EXISTS": // 파일 정보 리소스 존재
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 422: // UNPROCESSABLE_ENTITY
      switch (resultCode) {
        case 'INCORRECT_FORMAT_EMAIL': // 이메일 형식 불일치
          alert('이메일 형식이 잘못되었습니다.');
          break;
        case "INCORRECT_FORMAT_NAME": // 이름 형식 불일치
          break;
        case "INCORRECT_FORMAT_PASSWORD": // 비밀번호 형식 불일치
          break;
        case "INCORRECT_FORMAT_INTRO": // 소개글 형식 불일치
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 500: // INTERNAL_SERVER_ERROR
      switch (resultCode) {
        case "INTERNAL_SERVER_ERROR": // 내부 서버 에러
          break;
        case "EMAIL_NOT_SENT": // 내부 서버 에러로 인한 이메일 전송 실패
          break;
        case "CRYPT_ERROR": // 내부 서버 에러로 인한 암호화 실패
          break;
        default:
          navigate('/error');
          break;
      }
      break;

    case 'ERR_NETWORK':
      alert(
        '서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요.'
      );

    default:
      navigate('/error');
      break;
  }
};