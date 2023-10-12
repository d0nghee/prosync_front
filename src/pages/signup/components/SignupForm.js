import React, { useState } from "react";
import { InputContent, LabelContent } from "../../../css/LoginStyle";
import {
  DivContainer,
  Page,
  SideContent,
  SideImage,
  Image,
  VerifyCodeContainer,
  VerifyCodeButton,
} from "../../../css/SignupStyle";
import Button from "../../../components/button/Button";
import signupImage from "../../../util/signup.png";
import DoubleCheck from "./DoubleCheck";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setFormData,
  setIsConfirmModalOpen,
  setIsEmailValid,
  setIsPasswordMatch,
  setIsVerfied,
  setModalButtons,
  setModalMessage,
  setVerifiedPassword,
} from "../../../redux/reducers/member/signupSlice";
import Popup from "../../../components/popup/Popup";
import ConfrimButton from "./ConfirmButton";
import { axiosInstance } from "../../../util/axiosInstances";
import { postApi } from "../../../util/api";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
} from "../../../util/regex";
import { useEffect } from "react";
import EmailCheck from "./EmailCheck";
import VerifyCheck from "./VerifyCheck";
import NameCheck from "./NameCheck";
import PasswordCheck from "./PasswordCheck";

export default function SignupForm() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const navi = useNavigate();

  const [isVerifyCodeVisible, setIsVerifyCodeVisible] = useState(false);
  const [isVerifyCodeButtonVisible, setIsVerifyCodeButtonVisible] =
    useState(false);
  const location = useLocation();
  const [isNameNotCorrect, setIsNameNotCorrect] = useState(false);
  const [isPasswordNotCorrect, setIsPasswordNotCorrect] = useState(false);

  useEffect(() => {
    dispatch(
      setFormData({
        email: "",
        password: "",
        name: "",
        certificationNumber: "",
      })
    );
    dispatch(
      setVerifiedPassword({
        verifypassword: "",
      })
    );
    dispatch(setIsEmailValid(false));
    dispatch(setIsPasswordMatch(false));
  }, [location]);

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      dispatch(
        setFormData({
          ...signup.formData,
          email: event.target.value,
        })
      );
    } else if (event.target.name === "name") {
      dispatch(
        setFormData({
          ...signup.formData,
          name: event.target.value,
        })
      );
    } else if (event.target.name === "password") {
      dispatch(
        setFormData({
          ...signup.formData,
          password: event.target.value,
        })
      );
    } else if (event.target.name === "verifypassword") {
      dispatch(
        setVerifiedPassword({
          ...signup.verifiedPassword,
          verifypassword: event.target.value,
        })
      );
    } else if (event.target.name === "certificationNumber") {
      dispatch(
        setFormData({
          ...signup.formData,
          certificationNumber: event.target.value,
        })
      );
    }
  };

  const handleCreateButtonClick = () => {
    console.log("signup.formData");
    console.log(signup.formData);

    if (!nameValidate(signup.formData.name)) {
      if (passwordValidate(signup.formData.password)) {
        setIsPasswordNotCorrect(false);
      } else {
        setIsPasswordNotCorrect(true);
      }

      dispatch(setIsConfirmModalOpen(true));
      dispatch(
        setModalMessage(
          "이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요."
        )
      );
      dispatch(
        setModalButtons([
          {
            label: "확인",
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
              setIsNameNotCorrect(true);
            },
          },
        ])
      );
      return;
    }

    setIsNameNotCorrect(false);

    if (!passwordValidate(signup.formData.password)) {
      dispatch(setIsConfirmModalOpen(true));
      dispatch(
        setModalMessage(
          "비밀번호 형식이 잘못되었습니다. 특수문자를 포함한 8~15 글자로 입력하세요."
        )
      );
      dispatch(
        setModalButtons([
          {
            label: "확인",
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
              setIsPasswordNotCorrect(true);
            },
          },
        ])
      );
      return;
    }

    setIsPasswordNotCorrect(false);

    postApi("/signup", signup.formData)
      .then(() => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("회원가입에 성공하셨습니다!"));
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
                navi("/login");
              },
            },
          ])
        );
      })
      .catch((error) => {
        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_EMAIL"
        ) {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(setModalMessage("잘못된 이메일 형식입니다."));
          dispatch(
            setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
          return;
        }

        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_PASSWORD"
        ) {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(
            setModalMessage(
              "비밀번호 형식이 잘못되었습니다. 특수문자를 포함한 8~15 글자로 입력하세요."
            )
          );
          dispatch(
            setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                  setIsPasswordNotCorrect(true);
                },
              },
            ])
          );
          return;
        }

        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_NAME"
        ) {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(
            setModalMessage(
              "이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요."
            )
          );
          dispatch(
            setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                  setIsNameNotCorrect(true);
                },
              },
            ])
          );
        }

        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("빈칸 없이 입력해주세요."));
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
              },
            },
          ])
        );
      });
  };

  const handleCancelButtonClick = () => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setModalMessage("취소하시겠습니까?"));
    dispatch(
      setModalButtons([
        {
          label: "확인",
          onClick: () => {
            dispatch(setIsConfirmModalOpen(false));
            navi("/login");
          },
        },
        {
          label: "취소",
          onClick: () => {
            dispatch(setIsConfirmModalOpen(false));
          },
        },
      ])
    );
  };

  const handleIdCheckButtonClick = async () => {
    if (!emailValidate(signup.formData.email)) {
      dispatch(setIsConfirmModalOpen(true));
      dispatch(
        setModalMessage("이메일 형식이 잘못되었습니다. 다시 입력해주세요.")
      );
      dispatch(
        setModalButtons([
          {
            label: "확인",
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
              // 이메일 옆에 빨간글자
            },
          },
        ])
      );
      return;
    }

    postApi("/idcheck", signup.formData)
      .then((res) => {
        console.log(res.data);
        alert("사용하실 수 있는 이메일입니다.");
        dispatch(setIsEmailValid(true));
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_EMAIL"
        ) {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(setModalMessage("잘못된 이메일 형식입니다."));
          dispatch(
            setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
          return;
        }

        if (
          error.response.status === 409 &&
          error.response.data.resultCode === "DUPLICATED_USER_ID"
        ) {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(setModalMessage("중복된 이메일입니다."));
          dispatch(
            setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
        }
      });
  };

  const handleVerifiedEmail = async () => {
    if (!signup.isEmailValid) {
      dispatch(setIsConfirmModalOpen(true));
      dispatch(setModalMessage("이메일 입력을 먼저 통과하셔야 합니다!"));
      dispatch(
        setModalButtons([
          {
            label: "확인",
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
            },
          },
        ])
      );
      return;
    }

    axiosInstance
      .post("/send_verification", signup.formData)
      .then(async (res) => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("전송되었습니다."));
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
              },
            },
          ])
        );
        setIsVerifyCodeVisible(!isVerifyCodeVisible);
      })
      .catch((error) => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(
          setModalMessage("인증번호가 잘못되었습니다. 다시 입력하세요.")
        );
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
              },
            },
          ])
        );
        console.log(error);
      });
  };

  const handleVerifiedCodeSendToServer = () => {
    axiosInstance
      .post("/verify_code", signup.formData)
      .then(async (res) => {
        alert("인증 번호가 일치합니다");
        setIsVerifyCodeButtonVisible(true);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("인증번호가 일치하지 않습니다."));
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
              },
            },
          ])
        );
      });
  };

  return (
    <>
      <Page>
        <SideImage>
          <Image src={signupImage}></Image>
        </SideImage>

        <SideContent>
          <LabelContent>Email</LabelContent>
          <DivContainer>
            <InputContent
              onChange={handleInputChange}
              readOnly={signup.isEmailValid}
              type="email"
              name="email"
              id="email"
            />
            <ConfrimButton
              onClick={handleIdCheckButtonClick}
              disabled={signup.isEmailValid}
            >
              중복확인
            </ConfrimButton>
            <EmailCheck />
          </DivContainer>

          <DivContainer>
            <LabelContent>Verify Code</LabelContent>
            <Button
              backgroundColor={isVerifyCodeButtonVisible ? "gray" : "#7B69B7"}
              label="전송"
              width="18%"
              height="2.2rem"
              onClick={handleVerifiedEmail}
              disabled={isVerifyCodeButtonVisible}
            />
          </DivContainer>

          <VerifyCodeContainer isVisible={isVerifyCodeVisible}>
            <DivContainer>
              <InputContent
                onChange={handleInputChange}
                type="text"
                name="certificationNumber"
                id="certificationNumber"
                readOnly={isVerifyCodeButtonVisible}
              />
              <VerifyCodeButton
                backgroundColor={isVerifyCodeButtonVisible ? "gray" : "#7B69B7"}
                label="인증번호 확인"
                width="18%"
                height="2.2rem"
                onClick={handleVerifiedCodeSendToServer}
                disabled={isVerifyCodeButtonVisible}
              />
              <VerifyCheck
                isVerifyCodeButtonVisible={isVerifyCodeButtonVisible}
              />
            </DivContainer>
          </VerifyCodeContainer>

          <LabelContent>Name</LabelContent>
          <InputContent
            onChange={handleInputChange}
            type="text"
            name="name"
            id="name"
          />
          <NameCheck isNameNotCorrect={isNameNotCorrect} />

          <LabelContent>Password</LabelContent>
          <InputContent
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
          />
          <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />

          <LabelContent>Confirm Password</LabelContent>
          <DivContainer>
            <InputContent
              onChange={handleInputChange}
              type="password"
              name="verifypassword"
              id="verifypassword"
            />
            <DoubleCheck
              First={signup.formData.password}
              Second={signup.verifiedPassword.verifypassword}
            ></DoubleCheck>
          </DivContainer>
          <Button
            backgroundColor={
              signup.isEmailValid &&
              signup.isPasswordMatch &&
              isVerifyCodeButtonVisible
                ? "#7B69B7"
                : "gray"
            }
            label="생성"
            onClick={handleCreateButtonClick}
            disabled={
              !(
                signup.isEmailValid &&
                signup.isPasswordMatch &&
                isVerifyCodeButtonVisible
              )
            }
            modalCheck="생성"
          ></Button>
        </SideContent>
      </Page>
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      ></Popup>
    </>
  );
}
