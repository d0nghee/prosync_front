import { styled } from "styled-components";

export default function TaskStatus({ color, name }) {
  console.log(name);
  return <Badge color={color}>{name}</Badge>;
}

const Badge = styled.span`
  display: inline-block;
  width: 150px;
  height: 50px;
  border-radius: 30px;
  background-color: ${(props) => props.color || "#007bff"};
  color: ${(props) => props.name || "white"};
  font-size: 18x;
  font-weight: bold;
  min-width: 150px;
  text-align: center;
  line-height: 50px;
`;
