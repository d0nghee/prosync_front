import { styled } from "styled-components";

export default function Guidance({ text }) {
  return <Box>{text}</Box>;
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  height: 30rem;
  padding: 20rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
