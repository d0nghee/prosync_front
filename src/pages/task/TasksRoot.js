import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

export default function TasksRoot() {
  return (
    <>
      <Root />
      <Outlet />
    </>
  );
}

const Root = styled.div`
  margin: 5rem;
`;
