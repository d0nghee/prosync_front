import React from "react";
import { CustomDiv, Label, InputText } from "../../../css/MyPageStyle";
import Button from "../../../components/button/Button";
import Popup from "../../../components/popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { setMemberInfo } from "../../../redux/reducers/member/mypageSlice";
import {
  setIsConfirmModalOpen,
  setModalButtons,
  setModalMessage,
} from "../../../redux/reducers/member/signupSlice";
import { useNavigate } from "react-router-dom";
import { patchApi } from "../../../util/api";
import { useState } from "react";
import PasswordCheck from "../../signup/components/PasswordCheck";
import { passwordValidate } from "../../../util/regex";
import DoubleCheck from "../../signup/components/DoubleCheck";

export default function EditPassword() {
  const dispatch = useDispatch();
  const mypage = useSelector((state) => state.mypage);
  const signup = useSelector((state) => state.signup);
  const navi = useNavigate();
  const [isPasswordNotCorrect, setIsPasswordNotCorrect] = useState(false);

  const handleChange = (e) => {
    console.log(mypage.memberInfo);

    dispatch(
      setMemberInfo({
        ...mypage.memberInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const data = {
    password: mypage.memberInfo.password,
  };

  const modifyPassword = () => {
    if (!passwordValidate(mypage.memberInfo.password)) {
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
            },
          },
        ])
      );
      
      setIsPasswordNotCorrect(true);
      return;
    }

    setIsPasswordNotCorrect(false);

    patchApi("/members/password", data)
      .then(() => {
        dispatch(setIsConfirmModalOpen(true));
        dispatch(setModalMessage("비밀번호가 변경되었습니다."));
        dispatch(
          setModalButtons([
            {
              label: "확인",
              onClick: () => {
                dispatch(setIsConfirmModalOpen(false));
                navi("/");
              },
            },
          ])
        );
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_PASSWORD"
        ) {
          setIsPasswordNotCorrect(true);
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
                },
              },
            ])
          );
        }
      });
  };

  return (
    <>
      <CustomDiv>
        <Label>변경 비밀번호 입력 : &nbsp;</Label>
        <InputText
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />
      </CustomDiv>
      <CustomDiv>
        <Label> 비밀번호 재입력 :&nbsp;</Label>
        <InputText type="password" name="pw" id="pw" onChange={handleChange} />
        <DoubleCheck
          First={mypage.memberInfo.password}
          Second={mypage.memberInfo.pw}
        />
      </CustomDiv>
      <CustomDiv style={{ justifyContent: "center" }}>
        <Button
          backgroundColor={
            !(mypage.memberInfo.password === mypage.memberInfo.pw)
              ? "gray"
              : "#7B69B7"
          }
          width="20%"
          label="수정"
          color="#FFDAB9"
          onClick={modifyPassword}
          disabled={!(mypage.memberInfo.password === mypage.memberInfo.pw)}
        ></Button>
        <Button
          backgroundColor="#E9967A"
          width="20%"
          label="취소"
          color="#FFDAB9"
          onClick={() => navi("/")}
        ></Button>
      </CustomDiv>
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      />
    </>
  );
}
