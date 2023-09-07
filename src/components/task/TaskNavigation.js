import { NavLink, useLocation, Form } from "react-router-dom";
import { styled } from "styled-components";

export default function TaskNavigation() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "table";

  return (
    <>
      <TaskNav>
        <TaskFilter>
          <div>FILTER</div>
          <NavItem to="?view=table" selected={view === "table"}>
            TABLE
          </NavItem>
          <NavItem to="?view=board" selected={view === "board"}>
            BOARD
          </NavItem>
          <NavItem to="?view=roadmap" selected={view === "roadmap"}>
            ROAD MAP
          </NavItem>
        </TaskFilter>
        <Buttons>
          <Form>
            <ActionButton color="#4361ee">수정</ActionButton>
          </Form>
          <Form>
            <ActionButton color="red">삭제</ActionButton>
          </Form>
        </Buttons>
      </TaskNav>
    </>
  );
}

const TaskNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50rem;
  width: 85rem;
  height: 5rem;
`;

const TaskFilter = styled.div`
  display: flex;
  gap: 3rem;

  margin: 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  align-items: center;

  font-weight: bold;
  color: #495057;

  div {
    padding-bottom: 3px;
  }
`;

const NavItem = styled(NavLink)`
  cursor: pointer;
  color: #495057;
  padding-bottom: 3px;
  border-bottom: ${(props) => (props.selected ? "4px solid #8338ec" : "none")};
  color: ${(props) => (props.selected ? "#8338ec" : "#495057")};

  &:hover {
    color: #8338ec;
    border-bottom: 4px solid #8338ec;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  cursor: pointer;
  background-color: #4361ee;
  padding: 15px 20px;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  width: 70px;

  &:hover {
    opacity: 0.8;
  }
`;
