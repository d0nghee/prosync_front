// import React, { useState } from "react";
// import CustomButton from "../../components/button/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";

// import LoginForm from "./components/loginForm";
// import { LoginButtonContainer } from "../../css/LoginStyle";
// import {
//   setIsLoggedIn,
//   setLoginFormData,
// } from "../../redux/reducers/loginSlice";
// import axiosInstance from "../../util/axiosInstancs";
// import { getCookie, setCookie } from "../../util/cookies";
// import { getApi, postApi } from "../../util/api";
// import axios from "axios";
// import Popup from "../../components/popup/Popup";
// import {
//   setIsConfirmModalOpen,
//   setModalButtons,
//   setModalMessage,
// } from "../../redux/reducers/signupSlice";

// import { store } from "../../redux/store/index";
// import Loading from "../../components/common/Loading";
// import { tryFunc } from "../../util/tryFunc";

// export default function Login() {

//   const dispatch = useDispatch();
//   const login = useSelector((state) => state.login);
//   const navigate = useNavigate();
//   const signup = useSelector((state) => state.signup);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const handleInputChange = (name, value) => {
//     if (name === 'email') {
//       handleEmailChange(value);
//     } else if (name === 'password') {
//       handlePasswordChange(value);
//     }
//   };

//   const handleEmailChange = (value) => {
//     dispatch(
//       setLoginFormData({
//         ...login.loginFormData,
//         email: value,
//       })
//     );
//   };

//   const handlePasswordChange = (value) => {
//     dispatch(
//       setLoginFormData({
//         ...login.loginFormData,
//         password: value,
//       })
//     );
//   };

//   const loginFunc = async () => {
//     const response = await postApi('/login', login.loginFormData);

    
//     const header = response.headers;
//     const access = await header.authorization;
//     const refresh = await header.refresh;

//     if (access && refresh) {
//       setCookie("accessToken", access, { path: "/" });
//       setCookie("refreshToken", refresh, {
//         path: "/",
//         maxAge: 60 * 60 * 24 * 30,
//       });
//     }

//     return response;
//   };

//   const fetchMemberInfo = async () => {
//     const res = await getApi("/members");
//     setCookie("memberId", res.data.memberId, {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30,
//     });
//     setCookie("profile", res.data.profileImage, {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30,
//     });
//     setCookie("name", res.data.name, { path: "/", maxAge: 60 * 60 * 24 * 30 });
//     setCookie("email", res.data.email, {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30,
//     });
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     const errorHandlers = {
//       401: (error) => {
//         console.log(error.response.status);
//         dispatch(setIsConfirmModalOpen(true));
//         dispatch(setModalMessage("일치하는 계정 정보가 없습니다. 이메일 혹은 비밀번호를 다시 입력하세요."));
//         dispatch(
//           setModalButtons([
//             {
//               label: "확인",
//               onClick: () => dispatch(setIsConfirmModalOpen(false)),
//             },
//           ])
//         );
//       },
//       404: (error) => {
//         console.log(error.response.status);
//         dispatch(setIsConfirmModalOpen(true));
//         dispatch(setModalMessage("회원 정보를 찾지 못하였습니다."));
//         dispatch(
//           setModalButtons([
//             {
//               label: "확인",
//               onClick: () => dispatch(setIsConfirmModalOpen(false)),
//             },
//           ])
//         );
//       },
//       422: (error) => {
//         console.log(error.response.status);
//         dispatch(setIsConfirmModalOpen(true));
//         dispatch(setModalMessage("이메일 형식이 잘못되었습니다."));
//         dispatch(
//           setModalButtons([
//             {
//               label: "확인",
//               onClick: () => dispatch(setIsConfirmModalOpen(false)),
//             },
//           ])
//         );
//       },
      
//       default: (error) => {
//         console.error("Unknown error:", error);
//       },
//     };

//     const onLoginSuccess = async () => {
//       try {
//         await fetchMemberInfo();
//         console.log("fetchMemberInfo 완료");
//         const returnUrl = params.get("returnUrl");
//         navigate(returnUrl || "/");
//         dispatch(setIsLoggedIn(true));
//       } catch (error) {
//         console.log("member 데이터 정보 읽어오기 실패");
//       }
//     };

//     tryFunc(loginFunc, onLoginSuccess, errorHandlers)().finally(() =>
//       setLoading(false)
//     );
//   };

//   const handleSignup = () => {
//     navigate("/signup");
//   };

//   return (
//     <div>
//       <div>
//         <LoginForm onChange={handleInputChange}></LoginForm>
//       </div>
//       <LoginButtonContainer>
//         <CustomButton
//           backgroundColor="#7B69B7"
//           label="로그인"
//           onClick={handleLogin}
//         />
//         <CustomButton
//           label="회원가입"
//           backgroundColor="#7E99A1"
//           onClick={handleSignup}
//         />
//       </LoginButtonContainer>
//       <Popup
//         isOpen={signup.isConfirmModalOpen}
//         message={signup.modalMessage}
//         buttons={signup.modalButtons}
//       />

//       {loading && <Loading />}
//     </div>
//   );
// }


import React, { useState } from "react";
import CustomButton from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import LoginForm from "./components/loginForm";
import { LoginButtonContainer } from "../../css/LoginStyle";
import {
  setIsLoggedIn,
  setLoginFormData,
} from "../../redux/reducers/member/loginSlice";
import axiosInstance from "../../util/axiosInstancs";
import { getCookie, setCookie } from "../../util/cookies";
import { getApi, postApi } from "../../util/api";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import {
  setIsConfirmModalOpen,
  setModalButtons,
  setModalMessage,
} from "../../redux/reducers/member/signupSlice";

import { store } from "../../redux/store/index";
import Loading from "../../components/common/Loading";
import { tryFunc } from "../../util/tryFunc";

export default function Login() {

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const signup = useSelector((state) => state.signup);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleInputChange = (name, value) => {
    if (name === 'email') {
      handleEmailChange(value);
    } else if (name === 'password') {
      handlePasswordChange(value);
    }
  };

  const handleEmailChange = (value) => {
    dispatch(
      setLoginFormData({
        ...login.loginFormData,
        email: value,
      })
    );
  };

  const handlePasswordChange = (value) => {
    dispatch(
      setLoginFormData({
        ...login.loginFormData,
        password: value,
      })
    );
  };

  const loginFunc = async () => {
    const response = await postApi('/login', login.loginFormData);

    
    const header = response.headers;
    const access = await header.authorization;
    const refresh = await header.refresh;

    if (access && refresh) {
      setCookie("accessToken", access, { path: "/" });
      setCookie("refreshToken", refresh, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  };

  const fetchMemberInfo = async () => {
    const res = await getApi("/members");
    setCookie("memberId", res.data.memberId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("profile", res.data.profileImage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("name", res.data.name, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    setCookie("email", res.data.email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const handleLogin = async () => {
    setLoading(true);

    const onLoginSuccess = async () => {
      try {
        await fetchMemberInfo();
        console.log("fetchMemberInfo 완료");
        const returnUrl = params.get("returnUrl");
        navigate(returnUrl || "/");
        dispatch(setIsLoggedIn(true));
      } catch (error) {
        console.log("member 데이터 정보 읽어오기 실패");
      }
    };

    tryFunc(loginFunc, onLoginSuccess, dispatch)().finally(() =>
      setLoading(false)
    );
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div>
        <LoginForm onChange={handleInputChange}></LoginForm>
      </div>
      <LoginButtonContainer>
        <CustomButton
          backgroundColor="#7B69B7"
          label="로그인"
          onClick={handleLogin}
        />
        <CustomButton
          label="회원가입"
          backgroundColor="#7E99A1"
          onClick={handleSignup}
        />
      </LoginButtonContainer>
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      />

      {loading && <Loading />}
    </div>
  );
}