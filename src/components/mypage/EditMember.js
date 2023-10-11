import React from "react";
import Button from "../button/Button";
import { styled } from "styled-components";
import {
  CustomDiv,
  Label,
  InputText,
  InputTextArea,
} from "../../css/MyPageStyle";
import { useDispatch, useSelector } from "react-redux";
import { setMemberInfo } from "../../redux/reducers/member/mypageSlice";
import axiosInstance from "../../util/axiosInstances";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookies";
import { getApi, postFileApi } from "../../util/api";
import { introValidate, nameValidate } from "../../util/regex";
import IntroCheck from "../../components/signup/IntroCheck";
import NameCheck from "../../components/signup/NameCheck";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";

export default function EditMember() {
  const dispatch = useDispatch();
  const mypage = useSelector((state) => state.mypage);
  const navi = useNavigate();
  const [originalInfo, setOriginalInfo] = useState({});
  const location = useLocation();
  const [isNameNotCorrect, setIsNameNotCorrect] = useState(false);
  const [isIntroNotCorrect, setIsIntroNotCorrect] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    getApi("/members")
      .then((response) => {
        console.log(response);

        setOriginalInfo({
          name: response.data.name,
          profileImage: response.data.profileImage,
          intro: response.data.intro,
        });

        dispatch(
          setMemberInfo({
            ...mypage.memberInfo,
            name: response.data.name,
            profileImage: response.data.profileImage,
            intro: response.data.intro,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 404 &&
          error.response.data.resultCode === "USER_NOT_FOUND"
        ) {
          alert("유저 정보를 찾지 못하였습니다.");
        }
      });
  }, [location, image, dispatch]);

  const hasChanges = () => {
    if (!originalInfo) return false;
    return (
      originalInfo.name !== mypage.memberInfo.name ||
      originalInfo.intro !== mypage.memberInfo.intro ||
      originalInfo.profileImage !== mypage.memberInfo.profileImage
    );
  };

  const handleChange = (e) => {
    dispatch(
      setMemberInfo({
        ...mypage.memberInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleEdit = () => {
    if (!nameValidate(mypage.memberInfo.name)) {
      if (introValidate(mypage.memberInfo.intro)) {
        setIsIntroNotCorrect(false);
      }
      alert(
        "이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요."
      );
      setIsNameNotCorrect(true);
      return;
    }

    setIsNameNotCorrect(false);

    if (!introValidate(mypage.memberInfo.intro)) {
      alert(
        "소개글 형식이 잘못되었습니다. 최소 20글자 최대 500글자로 입력하세요."
      );
      setIsIntroNotCorrect(true);

      return;
    }

    setIsIntroNotCorrect(false);

    axiosInstance
      .patch("/members/profile", mypage.memberInfo)
      .then(() => {
        getApi("/members").then(async (res) => {
          setCookie("profile", res.data.profileImage, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
          });
          setCookie("name", res.data.name, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
          });
          alert("프로필을 수정하였습니다.");
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log("프로필 수정 실패");

        if (
          error.response.status === "422" &&
          error.response.data.resultCode === "INCORRECT_FORMAT_NAME"
        ) {
          setIsIntroNotCorrect("true");
          alert(
            "이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요."
          );
        } else if (
          error.response.status === "422" &&
          error.response.data.resultCode === "INCORRECT_FORMAT_INTRO"
        ) {
          setIsNameNotCorrect("true");
          alert(
            "소개글 형식이 잘못되었습니다. 최소 20글자 최대 500글자로 입력하세요."
          );
        } else {
          alert("서버 오류로 인해 프로필 수정을 실패하였습니다.");

          console.log(error);
        }
      });
  };

  const handleCancel = () => {
    const isConfirm = window.confirm("취소하시겠습니까?");
    if (isConfirm) {
      navi("/");
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length !== 1) {
      alert("한건만 선택하세요.");
      return;
    }
    (async () => {
      await tryFunc(
        () => postFileApi(files),
        async (file) => {
          await axiosInstance.patch("/members/profile", {
            ...mypage.memberInfo,
            fileId: file[0].fileId,
          });
          setCookie("profile", file[0].path, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
          });
          setImage(file[0].path);
          alert("프로필 이미지가 변경되었습니다.");
          window.location.reload();
        },
        dispatch
      )();
    })();
  };

  return (
    <ProfileGridContainer>
      <ProfileImage src={mypage.memberInfo.profileImage} />
      <div
        style={{
          justifyContent: "center",
          width: "100%",
          marginTop: "30px",
          marginLeft: "5rem",
        }}
      >
        <FileContainer>
          <CustomFileUpload htmlFor="file-upload">이미지 변경</CustomFileUpload>
          <FileInput
            type="file"
            id="file-upload"
            onChange={handleFileChange}
          ></FileInput>
        </FileContainer>
      </div>
      <DivContainer>
        <CustomDiv>
          <Label>이름 입력 : &nbsp;</Label>
          <InputText
            type="text"
            name="name"
            id="name"
            value={mypage.memberInfo.name}
            onChange={handleChange}
          />
          <NameCheck isNameNotCorrect={isNameNotCorrect} />
        </CustomDiv>
        <CustomDiv>
          <Label>소개글 입력 :&nbsp;</Label>
          <InputTextArea
            name="intro"
            id="intro"
            value={mypage.memberInfo.intro}
            onChange={handleChange}
          />
          <IntroCheck isIntroNotCorrect={isIntroNotCorrect} />
        </CustomDiv>
      </DivContainer>
      <CustomDiv style={{ justifyContent: "center" }}>
        <Button
          backgroundColor={!hasChanges() ? "gray" : "#7B69B7"}
          width="20%"
          label="수정"
          color="#FFDAB9"
          onClick={handleEdit}
          disabled={!hasChanges()}
        ></Button>
        <Button
          backgroundColor="#E9967A"
          width="20%"
          label="취소"
          color="#FFDAB9"
          onClick={handleCancel}
        ></Button>
      </CustomDiv>
    </ProfileGridContainer>
  );
}

const ProfileImage = styled.img`
  width: 20rem;
  border: 5px solid #7b69b7;
  border-radius: 10rem;
  margin-left: 100px;
`;

const CustomFileUpload = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #7b69b7;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a428a;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ProfileGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-left: 20px;
  max-width: 1200px;
`;

const FileContainer = styled.div`
  grid-column: span 2;
  grid-row: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DivContainer = styled.div`
  grid-column: 1/6;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div``;
