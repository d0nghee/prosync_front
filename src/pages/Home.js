import React from 'react'
import { styled } from 'styled-components';
import Introduction from '../components/home/introduction/Introduction';
import Promotion from '../components/home/promotion/Promotion';

const HomeContainer = styled.div`
  height: 200rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => {
  return (
    <HomeContainer>
      <Promotion></Promotion>
      <Introduction></Introduction>
    </HomeContainer>
  )
}

export default Home