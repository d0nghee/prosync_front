import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const PromotionTextContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;

  & > div {
    margin-left: calc(100% * 1 / 5);
    width: calc(100% * 4 / 5);
  }

  & > div:nth-child(1) {
    margin-top: 18%;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.6;
  }

  & > div:nth-child(2) {
    margin-top: 5%;
    font-size: x-large;
  }

  & > div:nth-child(3) {
    margin-top: 5%;
    justify-self: center;
    align-self: center;

    & > div {
      background-color: white;
      border-radius: 40px;
      text-align: center;
      color: rgb(151, 138, 220);
      width: 30%;
      padding: 3%;
      font-size: 1.3rem;
      font-weight: 900;
      margin-left: 15%;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        color: white;
        box-shadow: 500px 0 0 0 rgba(0, 0, 0, 0.25) inset,
          -500px 0 0 0 rgba(0, 0, 0, 0.25) inset;
      }
    }
  }
`;

const PromotionText = () => {
    const navigate = useNavigate();

  return (
    <PromotionTextContainer>
      <div>
        Prosync를 이용하여
        <br /> 사원들과 프로젝트를 공유하세요
      </div>
      <div>Fast, easy & unlimited conference call services.</div>
      <div>
        <div onClick={() =>navigate('/signup')}>서비스 이용하기</div>
      </div>
    </PromotionTextContainer>
  );
};

export default PromotionText;
