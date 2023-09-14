import { styled } from "styled-components";

export default function NaviButton({ name, type, onClick, color, fontcolor }) {
  return (
    <>
      <Button type={type} onClick={onClick} color={color} fontcolor={fontcolor}>
        {name}
      </Button>
    </>
  );
}

const Button = styled.button`
  background-color: ${(props) => props.color || "#d9d9d9"};
  border: none;
  padding: 1rem;
  position: sticky;
  font-size: 1rem;
  border-radius: 5px;
  color: ${(props) => props.fontcolor || "#555"};
  width: 80px;

  &:hover {
    opacity: 0.8;
  }
`;
