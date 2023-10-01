import React from "react";
import styled from "styled-components";
import Card from "../common/Card";
import { useState } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const ServiceContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isPersonal === 'personal' ? 'white' : 'rgb(151,138,220)'};
  padding-bottom: 5%;

  & > div {
    margin: 0 5%;
  }

  & > .left-direction, .right-direction {
    cursor: pointer;
    color: ${props => props.isPersonal ==='personal' ? 'rgb(151,138,220)' : 'white'};
  }

  & > .left-direction:hover {
    color: black;
  }

  & > .right-direction:hover {
    color: black;

  }
`;

const Wrapper = styled.div`
  width: 50rem;
  overflow: hidden;
  height: 100%;
`;

const CardContainer = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  transition: transform 0.5s;
  transform: ${(props) => `translateX(${props.offset}rem)`};
  height: 100%;
  width: 200rem;
  display: flex;
`;

const Service = ({isPersonal, dataList}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slide = (direction) => {
    if (direction === 1 && currentIndex === dataList.length - 1) {
      setCurrentIndex(0);
    } else if (direction === -1 && currentIndex === 0) {
      setCurrentIndex(dataList.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + direction);
    }
  };

  const offset = -(currentIndex * 50);

  return (
    <ServiceContainer isPersonal={isPersonal}>
      <FontAwesomeIcon
        className="left-direction"
        icon={faAngleLeft}
        size="5x"
        onClick={() => slide(-1)}
        isPersonal={isPersonal}
      />
      <Wrapper>
        <CardContainer offset={offset}>
          {dataList.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </CardContainer>
      </Wrapper>
      <FontAwesomeIcon
        className="right-direction"
        icon={faAngleRight}
        size="5x"
        onClick={() => slide(1)}
        isPersonal={isPersonal}
      />
    </ServiceContainer>
  );
};

export default Service;
