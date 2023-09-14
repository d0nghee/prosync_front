import React from "react";
import { InputContent, LabelContent } from "../../css/LoginStyle";
import {
  DivContainer,
  Page,
  SideContent,
  SideImage,
  Image,
} from "../../css/SignupStyle";
import Button from "../button/Button";
import signupImage from "../../util/signup.png";
import DoubleCheck from "./DoubleCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setFormData, setIsConfirmModalOpen, setIsEmailValid, setModalButtons, setModalMessage, setVerifiedPassword } from "../../redux/signupSlice";
import Popup from '../popup/Popup'
import ConfrimButton from './ConfirmButton'


export default function SignupForm() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const navi = useNavigate();


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
  };

  const handleCreateButtonClick = () => {
    
    axios.post('http://localhost:8080/api/v1/members', signup.formData)
        .then(() => {
            dispatch(setIsConfirmModalOpen(true));
            dispatch(setModalMessage("success"));
            dispatch(setModalButtons({
                label : "확인",
                onClick : () => {
                    dispatch(setIsConfirmModalOpen(false));
                    navi('/login');
                }
            }));
        }).catch(() => {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(setModalMessage("빈 칸 없이 입력해주세요."));
          dispatch(setModalButtons({
            label : "확인",
            onClick : () => {
              dispatch(setIsConfirmModalOpen(false));
            }
          }))
        });

  }

  const handleCancelButtonClick = () => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setModalMessage("취소하시겠습니까?"));
    dispatch(setModalButtons([
        { label : "확인",
        onClick : () => { 
            dispatch(setIsConfirmModalOpen(false));
            navi('/login');
        }},
        { label : "취소",
        onClick : () => {
            dispatch(setIsConfirmModalOpen(false));
        }
    }
    ]))
  }

  const handleIdCheckButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/idcheck', {
        email: signup.formData.email,
      });
      
      if (response.data === false) {   // 중복 이메일 없음
        dispatch(setIsEmailValid(true));
      }
    } catch (error) {
      console.error('에러 발생:', error);
      throw error;
    }

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
              type="email"
              name="email"
              id="email"
            />
            <ConfrimButton
              onClick={handleIdCheckButtonClick}
              disabled={signup.isEmailValid}
            >중복확인</ConfrimButton>
          </DivContainer>
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
          <Button backgroundColor="#7B69B7" label="생성" onClick={handleCreateButtonClick}
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
