import React, { useState } from "react";
import { InputContent, LabelContent } from "../../../css/LoginStyle";
import {
  DivContainer,
  Page,
  SideContent,
  SideImage,
  Image,
  VerifyCodeContainer,
  VerifyCodeButton
} from "../../../css/SignupStyle";
import Button from "../../../components/button/Button";
import signupImage from "../../../util/signup.png";
import DoubleCheck from "./DoubleCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setFormData, setIsConfirmModalOpen, setIsEmailValid, setModalButtons, setModalMessage, setVerifiedPassword } from "../../../redux/reducers/signupSlice";
import Popup from '../../../components/popup/Popup'
import ConfrimButton from './ConfirmButton'
import { axiosInstance } from '../../../util/axiosInstancs'



export default function SignupForm() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const navi = useNavigate();

  const [isVerifyCodeVisible, setIsVerifyCodeVisible] = useState(false);
  const [isVerifyCodeButtonVisible, setIsVerifyCodeButtonVisible] = useState(false);


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
    }
    else if (event.target.name === "certificationNumber") {
      dispatch(
        setFormData({
          ...signup.formData,
          certificationNumber: event.target.value,
        })
      )
    }

  };

  const handleCreateButtonClick = () => {

    axios.post('http://localhost:8080/api/v1/members', signup.formData)
      .then(() => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("SUCCESS"));
        dispatch(setModalButtons([
          {
            label: "확인",
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
              navi('/login');
            }
          }
        ]));
      }).catch(() => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("빈 칸 없이 입력해주세요."));
        dispatch(setModalButtons([{
          label: "확인",
          onClick: () => {
            dispatch(setIsConfirmModalOpen(false));
          }
        }]))
      });

  }

  const handleCancelButtonClick = () => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setModalMessage("취소하시겠습니까?"));
    dispatch(setModalButtons([
      {
        label: "확인",
        onClick: () => {
          dispatch(setIsConfirmModalOpen(false));
          navi('/login');
        }
      },
      {
        label: "취소",
        onClick: () => {
          dispatch(setIsConfirmModalOpen(false));
        }
      }
    ]))
  }

  const handleIdCheckButtonClick = async () => {
    if (signup.formData.email !== '') {
      axios.post("http://localhost:8080/api/v1/idcheck", signup.formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            dispatch(setIsEmailValid(true));
          } else {
            dispatch(setIsConfirmModalOpen(true));
            dispatch(setModalMessage("중복입니다."));
            dispatch(setModalButtons([
              {
                label: "확인",
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                }
              }
            ]))
          }
        })
    } else {
      dispatch(setIsConfirmModalOpen(true));
      dispatch(setModalMessage("빈 칸 없이 입력하세요"));
      dispatch(setModalButtons([
        {
          label: "확인",
          onClick: () => {
            dispatch(setIsConfirmModalOpen(false));
          }
        }
      ]))
    }
  }

  const handleVerifiedEmail = async () => {
    console.log(signup.formData);

    axiosInstance.post("/send_verification", signup.formData)
      .then(async (res) => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage('전송되었습니다.'));
        dispatch(setModalButtons([
          {
            label: '확인',
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
            }
          }
        ]));
        setIsVerifyCodeVisible(!isVerifyCodeVisible);



      }).catch(error => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage('잘 못된 접근입니다.'));
        dispatch(setModalButtons([
          {
            label: '확인',
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
            }
          }
        ]));
        console.log(error);
      })

  }

  const handleVerifiedCodeSendToServer = () => {
    axiosInstance.post("/verify_code", signup.formData)
      .then(async (res) => {

        setIsVerifyCodeButtonVisible(true);

      })
      .catch(error => {

        console.log(error);
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("틀렸습니다"));
        dispatch(setModalButtons([
          {
            label: "확인", onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
            }
          }
        ]))

      })
  }

  return (
    <>
      <Page>
        <SideImage>
          <Image src={signupImage}></Image>
        </SideImage>

        <SideContent>
          <LabelContent>E-mail</LabelContent>
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
            >중복확인</ConfrimButton>
          </DivContainer>


          <DivContainer>
            <LabelContent>Verify Code</LabelContent>
            <Button
              backgroundColor="#7B69B7"
              label="전송"
              width="18%"
              height="2.2rem"
              onClick={handleVerifiedEmail}
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
            </DivContainer>
          </VerifyCodeContainer>


          <LabelContent>Name</LabelContent>
          <InputContent
            onChange={handleInputChange}
            type="text"
            name="name"
            id="name"
          />

          <LabelContent>Password</LabelContent>
          <InputContent
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
          />

          <LabelContent>Confirm Password</LabelContent>
          <DivContainer>
            <InputContent
              onChange={handleInputChange}
              type="password"
              name="verifypassword"
              id="verifypassword"
            />
            <DoubleCheck First={signup.formData.password} Second={signup.verifiedPassword.verifypassword}></DoubleCheck>
          </DivContainer>
          <Button
            backgroundColor={signup.isEmailValid && signup.isPasswordMatch && isVerifyCodeButtonVisible ? "#7B69B7" : "gray"}
            label="생성"
            onClick={handleCreateButtonClick}
            disabled={!(signup.isEmailValid && signup.isPasswordMatch && isVerifyCodeButtonVisible)}
            modalCheck='생성'
          ></Button>
          <Button backgroundColor="#B76969" label="취소" onClick={handleCancelButtonClick}></Button>
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
