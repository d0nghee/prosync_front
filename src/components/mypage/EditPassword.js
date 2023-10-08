import React from "react";
import { CustomDiv, Label, InputText, GridContainer } from "../../css/MyPageStyle";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setMemberInfo } from "../../redux/reducers/mypageSlice";
import { useNavigate } from "react-router-dom";
import { patchApi } from "../../util/api";
import { useState } from "react";
import PasswordCheck from "../signup/PasswordCheck";
import { passwordValidate } from "../../util/regex";
import DoubleCheck from "../signup/DoubleCheck";
import styled from 'styled-components'

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
      alert("비밀번호 형식이 잘못되었습니다. 특수문자를 포함한 8~15 글자로 입력하세요.");
      
      setIsPasswordNotCorrect(true);
      return;
    }

    setIsPasswordNotCorrect(false);

    patchApi("/members/password", data)
      .then(() => {
        alert("비밀번호가 변경되었습니다.");
        navi("/");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 422 &&
          error.response.data.resultCode === "INCORRECT_FORMAT_PASSWORD"
        ) {
          setIsPasswordNotCorrect(true);
          alert("비밀번호 형식이 잘못되었습니다. 특수문자를 포함한 8~15 글자로 입력하세요.");
        }
      });
  };

  return (
    <PassGridContainer>
      <Banner>
        <Word>
          비밀번호 변경
        </Word>
      </Banner>
      <Div>
        <PasswordLabel>변경 비밀번호 입력 : &nbsp;</PasswordLabel>
        <InputText
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />
      </Div>
      <Div>
        <PasswordLabel> 비밀번호 재입력 :&nbsp;</PasswordLabel>
        <Div style={{ flexDirection : "row", marginLeft :"70px"}}>
        <InputText type="password" name="pw" id="pw" onChange={handleChange} />
        <DoubleCheck
          First={mypage.memberInfo.password}
          Second={mypage.memberInfo.pw}
        />
        </Div>
        <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />
      </Div>
      <Div style={{ justifyContent: "center" }}>
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
      </Div>
    </PassGridContainer>
  );
}

const Banner = styled.div`
  margin-left : 200px;
  align-self : flex-start;

`
const Word = styled.p`
  font-size: 3em;
`

const PassGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 600px;
  margin-bottom: 20px;
`

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin : 0px 0px 0px 400px;
`
const PasswordLabel = styled.label`
 font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px; 
  margin-right: 130px;
`