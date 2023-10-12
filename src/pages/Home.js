import React from "react";
import { styled } from "styled-components";
import Introduction from "../components/home/introduction/Introduction";
import Promotion from "../components/home/promotion/Promotion";
import { useSelector } from "react-redux";
import PublicProjects from "./../components/home/loginned/PublicProjects";
import MyProjects from "../components/home/loginned/MyProjects";

const HomeContainer = styled.div`
  height: 220rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginHomeContainer = styled.div`
  /* height: 200rem; */
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
  }



  & > *:nth-child(2) {
    background-color: rgb(248, 240, 251);
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
  }
`;

const Home = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <HomeContainer>
          <Promotion></Promotion>
          <Introduction></Introduction>
        </HomeContainer>
      ) : (
        <LoginHomeContainer>
          <div><MyProjects></MyProjects></div>
          <div><PublicProjects></PublicProjects></div>
        </LoginHomeContainer>
      )}
    </>
  );
};

export default Home;
