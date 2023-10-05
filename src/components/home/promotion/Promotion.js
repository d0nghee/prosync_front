import React from 'react'
import { styled } from 'styled-components';
import PromotionText from './PromotionText';
import PromotionImage from './PromotionImage';

const PromotionContainer = styled.div`
    width: 100%;
    height: 50rem;
    background-color: rgb(151,138,220);
    display: flex;
`


const Promotion = () => {
  return (
    <PromotionContainer>
        <PromotionText></PromotionText>
        <PromotionImage></PromotionImage>
    </PromotionContainer>
  )
}

export default Promotion