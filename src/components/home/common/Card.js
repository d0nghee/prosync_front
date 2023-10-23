import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: pink;
  width: 50rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: white 2px solid;
  border-radius: 8rem;

  & > * {
    margin-bottom: 2%;
  }

  & > div:nth-child(1) {
    color: white;
    font-weight: 900;
    font-size: 2.5rem;
    height: 10%;
  }

  & > div:nth-child(2) {
    color: white;
    font-weight: 900;
    font-size: 1.1rem;
    height: 20%;
    padding: 0% 3%;
    word-wrap: break-word;
    white-space: pre-line; 
  }
`;

const Img = styled.img`
  width: ${(props) =>
    props.imgSize === "long"
      ? "50%"
      : props.imgSize === "short"
      ? "85%"
      : null};
  height: ${(props) =>
    props.imgSize === "long"
      ? "65%"
      : props.imgSize === "short"
      ? "45%"
      : null};
  object-fit: fill;
  margin-bottom: 4%;
`;

const Card = ({ data }) => {
  return (
    <Container>
      <div>{data.title}</div>
      <div>{data.content}</div>
      <Img src={data.img} imgSize={data.imgSize} />
    </Container>
  );
};

export default Card;
