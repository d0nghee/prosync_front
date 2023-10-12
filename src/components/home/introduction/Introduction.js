import React from "react";
import { styled } from "styled-components";
import Service from "./Service";
import test1 from "../../../assets/images/test1.png";
import test2 from "../../../assets/images/test2.png";
import test3 from "../../../assets/images/test3.png";
import test4 from "../../../assets/images/test4.png";
import test5 from "../../../assets/images/test5.png";
import test6 from "../../../assets/images/test6.png";
import test7 from "../../../assets/images/test7.png";
import test8 from "../../../assets/images/test8.png";


const personalDataList = [
  {
    id: 1,
    title: "Home",
    content: "홈 화면에 대한 소개글입니다.",
    img: test1,
    imgSize: "long",
  },
  {
    id: 2,
    title: "Notification",
    content: "알림 화면에 대한 소개글입니다.",
    img: test2,
    imgSize: "short",
  },
  {
    id: 3,
    title: "BookMark",
    content: "북마크 화면에 대한 소개글입니다.",
    img: test3,
    imgSize: "short",
  },
  {
    id: 4,
    title: "Log",
    content: "로그 화면에 대한 소개글입니다.",
    img: test4,
    imgSize: "short",
  },
];

const publicDataList = [
  {
    id: 1,
    title: "Project Detail",
    content: "프로젝트 테이블 뷰 화면에 대한 소개글입니다.",
    img: test5,
    imgSize: "short",
  },
  {
    id: 2,
    title: "TaskList",
    content: "업무 리스트에 대한 소개글입니다.",
    img: test8,
    imgSize: "short",
  },
  {
    id: 3,
    title: "Task Detail",
    content: "업무 상세 화면에 대한 소개글입니다.",
    img: test7,
    imgSize: "long",
  },
  {
    id: 4,
    title: "BoardView",
    content: "프로젝트 보드뷰 화면에 대한 소개글입니다.",
    img: test6,
    imgSize: "short",
  },
];

const IntroductionContainer = styled.div`
  width: 100%;
  height: 170rem;
  display: flex;
  flex-direction: column;
  background-color: white;

  & > .personal-title {
    font-size: 5rem;
    font-weight: 900;
    text-align: center;
    color: black;
    height: 7%;
    padding-top: 1%;
    
  }

  & > .public-title {
    font-size: 5rem;
    font-weight: 900;
    text-align: center;
    color: black;
    background-color: rgb(151,138,220);
    padding-top: 1%;
    height: 7%;

  }

  & > .footer-spare {
    height: 6%;
    background-color: rgb(151,138,220);
  }


`;

const Introduction = () => {
  return (
    <IntroductionContainer>
      <div className="personal-title">개인 서비스</div>
      <Service isPersonal={'personal'} dataList={personalDataList}/>
      <div className="public-title">프로젝트 업무 서비스</div>
      <Service isPersonal={'pulbic'} dataList={publicDataList}/>
      <div className="footer-spare"/>
    </IntroductionContainer>
  );
};

export default Introduction;
