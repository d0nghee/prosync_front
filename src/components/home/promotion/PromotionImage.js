import React from "react";
import { styled } from "styled-components";
import promotion from "../../../assets/images/promotion.png";
const PromotionImageContainer = styled.div`
  width: 50%;
  height: 100%;

  & > img {
    width: 80%;
    height: 90%;
    object-fit: fill;
    margin-left: 5%;
  }
`;

const PromotionImage = () => {
  return (
    <PromotionImageContainer>
      <img src={promotion} />
    </PromotionImageContainer>
  );
};

export default PromotionImage;
