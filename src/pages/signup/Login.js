import React, { useState } from "react";
import CustomButton from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "./components/loginForm";
import { LoginButtonContainer } from "../../css/LoginStyle";
import { setIsLoggedIn, setLoginFormData } from "../../redux/reducers/loginSlice";
import axiosInstance from "../../util/axiosInstancs";
import { setCookie } from "../../util/cookies";
import { getApi } from "../../util/api";
import axios from "axios";
import Popup from "../../components/popup/Popup";
import { setIsConfirmModalOpen, setModalButtons, setModalMessage } from "../../redux/reducers/signupSlice";

import { store } from '../../redux/store/index'
import { connectSse } from "../../util/eventSource/useSse";
import Loading from "../../components/common/Loading";

export default function Login() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navi = useNavigate();
  const signup = useSelector(state => state.signup);
  const [loading, setLoading] = useState(false);



  const handleInputChange = (name, value) => {
    if (name === "email") {
      handleEmailChange(value);
    } else if (name === "password") {
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

  const handleLogin = async () => {
    setLoading(true);

    axios.post("http://localhost:8080/api/v1/login", login.loginFormData, {
      headers : {
        "Content-Type" : "application/json",
        Accept : "application/json",
      },
    })
      .then(async (response) => {
        const header = response.headers;
        const access = await header.authorization;
        const refresh = await header.refresh;

        if (access && refresh) {
          setCookie("accessToken", access, { path: "/" });
          setCookie("refreshToken", refresh, { path: "/" });
        }


        let eventSource = store.getState().eventSource.eventSource;

        if (!eventSource) {
          console.log(localStorage.getItem('memberId'))
          eventSource = connectSse(localStorage.getItem('memberId'));
        }


        eventSource.addEventListener("sse", function (event) {
          console.log(event.data);

          const data = JSON.parse(event.data);

          (async () => {
            // 브라우저 알림
            const showNotification = () => {

              const notification = new Notification('코드 봐줘', {
                body: data.content
              });

              setTimeout(() => {
                notification.close();
              }, 10 * 1000);

              notification.addEventListener('click', () => {
                window.open(data.url, '_blank');
              });
            }

            // 브라우저 알림 허용 권한
            let granted = false;

            if (Notification.permission === 'granted') {
              granted = true;
            } else if (Notification.permission !== 'denied') {
              let permission = await Notification.requestPermission();
              granted = permission === 'granted';
            }

            // 알림 보여주기
            if (granted) {
              showNotification();
            }
          })();
        })

        eventSource.addEventListener("error", function (event) {
          if (event.target.readyState === EventSource.CLOSED) {
            console.log("SSE closed");
          } else if (event.target.readyState === EventSource.CONNECTING) {
            console.log("SSE reconnecting");
          } else {
            console.error("SSE error:", event);
          }
        });

        return response.status;

      }).then(() => {
        getApi("/members")
          .then(async (res) => {
            localStorage.setItem('memberId', JSON.stringify(res.data.memberId));
            setCookie("profile", res.data.profileImage, { path: "/" });
            setCookie("name", res.data.name, { path: "/" });
            navi("/");
            dispatch(setIsLoggedIn(true));
          })
          .catch(() => {
            dispatch(setIsConfirmModalOpen(true));
            dispatch(setModalMessage('정보 읽어오는데 실패하였습니다.'));
            dispatch(setModalButtons([
              {
                label: "확인", onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                  getApi("/removeToken")
                  .then(async (res) => {
                    navi("/login")
                  }).catch((error) => {
                    console.log(error)
                  })
                }
              }
            ]));
          })
      }
      )
      .catch(() => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage('잘 못된 정보를 입력하셨습니다.'));
        dispatch(setModalButtons([
          {
            label: "확인", onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
            }
          }
        ]));
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleSignup = () => {
    navi("/signup");
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
