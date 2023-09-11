import { useSelector } from "react-redux";
import {
  NavLink,
  useSearchParams,
  Form,
  useNavigate,
  Link,
} from "react-router-dom";
import { styled } from "styled-components";

export default function TaskNavigation() {
  const [searchPaarams] = useSearchParams();
  const view = searchPaarams.get("view") || "table";
  const navigate = useNavigate();

  const checkboxes = useSelector((state) => state.checkbox.checkboxes);

  const updateHandler = () => {
    const checkedItems = [];
    checkboxes.forEach((element) => {
      if (element.checked) {
        checkedItems.push(element.id);
      }
    });
    if (checkedItems.length > 1) {
      alert("수정은 한건만 가능합니다.");
    } else if (checkedItems.length === 1) {
      //TODO: 이동 안함 확인하기 - loader 문제인듯
      const taskId = checkedItems[0];
      navigate(`${taskId}/edit`);
    } else {
      alert("선택 대상이 없습니다.");
    }
  };

  const deleteHandler = () => {
    const checkedItems = [];
    checkboxes.forEach((element) => {
      if (element.checked) {
        checkedItems.push(element.id);
      }
    });
    if (checkedItems.length > 1) {
      window.confirm(`${checkedItems.length}건을 모두 삭제하시겠습니까?`);
    } else {
      window.confirm("1건을 삭제하시겠습니까?");
    }
    //TODO: 삭제 API 추가
  };

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
        {view !== "board" && view !== "roadmap" && (
          <Buttons>
            <div>
              <NewButton to="new">신규</NewButton>
            </div>
            <ActionButton color="#4361ee" onClick={updateHandler}>
              <Form>수정</Form>
            </ActionButton>

            <ActionButton color="red" onClick={deleteHandler}>
              <Form>삭제</Form>
            </ActionButton>
          </Buttons>
        )}
      </TaskNav>
    </>
  );
}

const TaskNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45rem;
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
  align-items: center;
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

const NewButton = styled(Link)`
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
