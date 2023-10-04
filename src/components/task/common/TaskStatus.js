import { styled } from "styled-components";

export default function TaskStatus({ color, name, width }) {
  return <Badge color={color}>{name}</Badge>;
}

const Badge = styled.div`
  height: 50px;
  border-radius: 30px;
  background-color: ${(props) => props.color || "#007bff"};
  color: ${(props) => props.name || "white"};
  font-size: 18x;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
  line-height: 50px;
  width: 100%;
`;
