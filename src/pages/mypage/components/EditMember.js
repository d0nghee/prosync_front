import React from 'react';
import Button from '../../../components/button/Button';
import Popup from '../../../components/popup/Popup';
import { styled } from 'styled-components';
import {
  CustomDiv,
  Label,
  InputText,
  InputTextArea,
} from "../../../css/MyPageStyle";
import { useDispatch, useSelector } from "react-redux";
import { setMemberInfo } from "../../../redux/reducers/member/mypageSlice";
import axiosInstance from "../../../util/axiosInstances";
import {
  setIsConfirmModalOpen,
  setModalButtons,
  setModalMessage,
} from "../../../redux/reducers/member/signupSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../util/cookies";
import { getApi } from "../../../util/api";
import { introValidate, nameValidate } from "../../../util/regex";
import IntroCheck from "../../signup/components/IntroCheck";
import NameCheck from "../../signup/components/NameCheck";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EditMember() {
  const dispatch = useDispatch();
  const mypage = useSelector((state) => state.mypage);
  const navi = useNavigate();
  const signup = useSelector((state) => state.signup);
  const [originalInfo, setOriginalInfo] = useState({});
  const location = useLocation();
  const [isNameNotCorrect, setIsNameNotCorrect] = useState(false);
  const [isIntroNotCorrect, setIsIntroNotCorrect] = useState(false);

  useEffect(() => {
    getApi('/members')
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
          error.response.data.resultCode === 'USER_NOT_FOUND'
        ) {
          alert('유저 정보를 찾지 못하였습니다.');
        }
      });
  }, [location]);

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

  const handleFileChange = (e) => {};

  const handleEdit = () => {
    if (!nameValidate(mypage.memberInfo.name)) {
      if (introValidate(mypage.memberInfo.intro)) {
        setIsIntroNotCorrect(false);
      }

      dispatch(setIsConfirmModalOpen(true));
      dispatch(
        setModalMessage(
          '이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요.'
        )
      );
      dispatch(
        setModalButtons([
          {
            label: '확인',
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

    if (!introValidate(mypage.memberInfo.intro)) {
      dispatch(setIsConfirmModalOpen(true));
      dispatch(
        setModalMessage(
          '소개글 형식이 잘못되었습니다. 최소 20글자 최대 500글자로 입력하세요.'
        )
      );
      dispatch(
        setModalButtons([
          {
            label: '확인',
            onClick: () => {
              dispatch(setIsConfirmModalOpen(false));
              setIsIntroNotCorrect(true);
            },
          },
        ])
      );
      return;
    }

    setIsIntroNotCorrect(false);

    axiosInstance
      .patch('/members/profile', mypage.memberInfo)
      .then(() => {
        getApi('/members').then(async (res) => {
          setCookie('profile', res.data.profileImage, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });
          setCookie('name', res.data.name, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          });
          dispatch(setIsConfirmModalOpen(true));
          dispatch(setModalMessage('프로필을 수정하였습니다.'));
          dispatch(
            setModalButtons([
              {
                label: '확인',
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                  navi('/');
                },
              },
            ])
          );
        });
      })
      .catch((error) => {
        console.log('프로필 수정 실패');

        if (
          error.response.status === '422' &&
          error.response.data.resultCode === 'INCORRECT_FORMAT_NAME'
        ) {
          setIsIntroNotCorrect('true');
          dispatch(setIsConfirmModalOpen(true));
          dispatch(
            setModalMessage(
              '이름의 형식이 잘못되었습니다. 실명을 적어주시고 7글자 이하로 입력하세요.'
            )
          );
          dispatch(
            setModalButtons([
              {
                label: '확인',
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
        } else if (
          error.response.status === '422' &&
          error.response.data.resultCode === 'INCORRECT_FORMAT_INTRO'
        ) {
          setIsNameNotCorrect('true');
          dispatch(setIsConfirmModalOpen(true));
          dispatch(
            setModalMessage(
              '소개글 형식이 잘못되었습니다. 최소 20글자 최대 500글자로 입력하세요.'
            )
          );
          dispatch(
            setModalButtons([
              {
                label: '확인',
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
        } else {
          dispatch(setIsConfirmModalOpen(true));
          dispatch(
            setModalMessage('서버 오류로 인해 프로필 수정을 실패하였습니다.')
          );
          dispatch(
            setModalButtons([
              {
                label: '확인',
                onClick: () => {
                  dispatch(setIsConfirmModalOpen(false));
                },
              },
            ])
          );
          console.log(error);
        }
      });
  };

  const handleCancel = () => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setModalMessage('취소하시겠습니까?'));
    dispatch(
      setModalButtons([
        {
          label: '확인',
          onClick: () => {
            dispatch(setIsConfirmModalOpen(false));
            navi('/');
          },
        },
        {
          label: '취소',
          onClick: () => {
            dispatch(setIsConfirmModalOpen());
          },
        },
      ])
    );
  };

  return (
    <>
      <CustomDiv style={{ justifyContent: 'left', marginLeft: '100px' }}>
        <ProfileImage src={originalInfo.profileImage} />

        <div
          style={{
            justifyContent: 'center',
            width: '100%',
            marginTop: '30px',
            marginLeft: '5rem',
          }}
        >
          <Button
            label="이미지 변경"
            width="15%"
            backgroundColor="#7B69B7"
            onClick={handleFileChange}
          ></Button>
        </div>
      </CustomDiv>
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
      <CustomDiv style={{ justifyContent: 'center' }}>
        <Button
          backgroundColor={!hasChanges() ? 'gray' : '#7B69B7'}
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
      <Popup
        isOpen={signup.isConfirmModalOpen}
        message={signup.modalMessage}
        buttons={signup.modalButtons}
      />
    </>
  );
}

const ProfileImage = styled.img`
  width: 20rem;
  border: 5px solid #7b69b7;
  border-radius: 10rem;
  margin-left: 100px;
`;
