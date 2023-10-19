import React, { useState } from "react";
import { styled } from "styled-components";
import SearchBar from "./SearchBar";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) =>
  !["isPersonal"].includes(prop)
})`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${props => !props.isPersonal ? '1.5%':null };

  & .project-link {
    position: absolute;
    left: 26%;
    background-color: hsl(226, 100%, 65%);
    padding: 20px;
    border-radius: 9px;
    color: #fff;
    font-weight: bold;
  }

 

  & .project-link:hover {
    opacity: 0.7;
  }
`;

const Counter = styled.div`
  display: flex;
  flex-direction: row;
  width: 37%;
  align-items: center;
  position: relative;
  font-size: ${props => !props.isPersonal ? 'x-large':null };

  & > div:nth-child(1) {
    width: 40%;
    font-size: x-large;
  }

  & > div:nth-child(2) {
    width: 30%;
    font-size: large;
  }

  & > div:nth-child(2):hover {
    text-decoration: underline;
    font-weight: 700;
  }

  & > .read-class {
    color: gray;
  }

  & > .read-class:hover {
    text-decoration: underline;
    font-weight: 700;
  }

  
`;

const Tooltip = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["show"].includes(prop)
})`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  top: -100%;
  left: 35%;
  z-index: 1000;
  color: black;
  font-weight: 900;
  white-space: normal;
  text-align: start;
  font-size: large;
`;




const UpperBar = ({
  isPersonal,
  codeInformation,
  count,
  notReadCount,
  AllRead,
  projectId
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();


  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Container isPersonal={isPersonal}>
      {isPersonal ? (
        !queryParams.get('code') &&
        !queryParams.get('startDate')  &&
        !queryParams.get('endDate')  &&
        !queryParams.get('content')  &&
        !queryParams.get('size')  ? (
          <Counter>
            <div>전체 알람</div>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span style={{ color: "#144381" }}>{notReadCount}</span> /{" "}
              <span>{count}</span>
            </div>
            <Tooltip
              show={showTooltip}
            >{`안읽은 알림 : ${notReadCount} 전체 알림 : ${count}`}</Tooltip>
            <div className="read-class" onClick={AllRead}>
              모두 읽음 처리
            </div>
          </Counter>
        ) : (
          <Counter>
            <div>검색 결과 : {count}</div>
          </Counter>
        )
      ) : ( !queryParams.get('code') &&
      !queryParams.get('startDate')  &&
      !queryParams.get('endDate')  &&
      !queryParams.get('content')  &&
      !queryParams.get('size')) ? (
        <Counter>
          <div>전체 로그</div>{count} Logs</Counter>
          
      ) : <Counter>
      <div>검색 결과</div>{count} Logs </Counter>}
      { isPersonal ? null : <div className="project-link" onClick={() => navigate(`/projects/${projectId}`)}>프로젝트 상세페이지</div>}
      <SearchBar
        isPersonal={isPersonal}
        codeInformation={codeInformation}
      />
    </Container>
  );
};

export default UpperBar;