import React from "react";
import { CustomDiv, Label, InputText, GridContainer } from "../../css/MyPageStyle";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setMemberInfo } from "../../redux/reducers/member/mypageSlice";
import { useNavigate } from "react-router-dom";
import { patchApi } from "../../util/api";
import { useState } from "react";
import PasswordCheck from "../signup/PasswordCheck";
import { passwordValidate } from "../../util/regex";
import DoubleCheck from "../signup/DoubleCheck";
import styled from 'styled-components'
import PwImage from '../../assets/icon/mypage_icon4.png'

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
    <>
      <Banner>
        <PwImg src={PwImage} />
        <BannerElement>
        <Word>
          비밀번호 변경
        </Word>
        <DesciptionContent>
          비밀번호는 특수문자를 포함한 8~15 글자로 입력하세요.
        </DesciptionContent>
        </BannerElement>
      </Banner>

      <FirstItem>
        <Div>
          <PasswordLabel>변경 비밀번호 입력 :</PasswordLabel>
          <InputText
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </Div>
        <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />
      </FirstItem>


      <SecItem>
        <PasswordLabel> 비밀번호 재입력 :</PasswordLabel>
        <InputText type="password" name="pw" id="pw" onChange={handleChange} />
        <Div>
        </Div>
        <PasswordCheck isPasswordNotCorrect={isPasswordNotCorrect} />
      </SecItem>
      <DivPw>
        <DoubleCheck
          First={mypage.memberInfo.password}
          Second={mypage.memberInfo.pw}
        />
      </DivPw>
      <ButtonContainer>
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
      </ButtonContainer>
    </>
  );
}

const PwImg = styled.img`
  width: 200px;
  height: 200px;
`

const BannerElement = styled.div`
  display: flex;
  flex-direction: column;
`

const DesciptionContent = styled.div`
  font-weight: 320;
  font-size: 22px;
  margin-left: 20px;
`

const Banner = styled.div`
  grid-column: 1/7;
  display: flex;
  flex-direction: row;
  margin-left: 100px;
`
const Word = styled.h1`
  margin-top: 50px;
  text-align: left;
  margin-left: 30px;
`

const Div = styled.div`
  
`
const DivPw = styled.div`
  grid-row: 3/3;
  grid-column: 5/6;
  margin-left: 60px;
  margin-top: 58px;
`

const ButtonContainer = styled.div`
  grid-row : 4/4;
  grid-column: 3/6;
`

const FirstItem = styled.div`
  margin-top: 200px;
  margin-left: 150px;
  grid-row: 2/2;
  grid-column: 2/6;
`

const SecItem = styled.div`
  margin-top: 60px;
  margin-left: 163px;
  grid-row: 3/3;
  grid-column: 2/6;
  
`
const PasswordLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px; 
  margin-right: 20px;
`