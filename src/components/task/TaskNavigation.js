import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { deleteApi, getApi } from "../../util/api";
import NaviButton from "../common/Button";
import { taskListAction } from "../../redux/reducers/taskList-slice";

export default function TaskNavigation() {
  const [searchPaarams] = useSearchParams();
  const view = searchPaarams.get("view") || "table";
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const checkboxes = useSelector((state) => state.checkbox.checkboxes);

  //TODO: 공통 로직 공통화하기 (?)
  const updateHandler = () => {
    const checkedItems = [];
    for (const id in checkboxes) {
      if (checkboxes[id].checked) {
        checkedItems.push(id);
      }
    }
    if (checkedItems.length > 1) {
      alert("수정은 한건만 선택이 가능합니다.");
    } else if (checkedItems.length === 1) {
      const taskId = checkedItems[0];
      navigate(`${taskId}/edit`);
    } else {
      alert("선택 대상이 없습니다.");
    }
  };

  const deleteHandler = () => {
    const checkedItems = [];
    for (const id in checkboxes) {
      if (checkboxes[id].checked) {
        checkedItems.push(id);
      }
    }
    if (checkedItems.length > 1) {
      const proceed = window.confirm(
        `${checkedItems.length}건을 모두 삭제하시겠습니까?`
      );
      if (proceed) {
        checkedItems.forEach((id) => {
          (async () => {
            await deleteApi(`tasks/${id}`);
            const response = await getApi(`projects/${params.projectId}/tasks`);
            const tasks = await response.data.data;
            dispatch(taskListAction.setTaskList(tasks));
          })();
        });
      }
    } else if (checkedItems.length === 1) {
      const proceed = window.confirm("1건을 삭제하시겠습니까?");
      if (proceed) {
        const taskId = checkedItems[0];
        (async () => {
          await deleteApi(`tasks/${taskId}`);
          const response = await getApi(`projects/${params.projectId}/tasks`);
          const tasks = await response.data;
          dispatch(taskListAction.setTaskList(tasks));
        })();
      }
    } else {
      alert("선택 대상이 없습니다.");
    }
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
            <NaviButton
              type="button"
              name="신규"
              color="#4361ee"
              fontcolor="white"
              onClick={() => navigate("new")}
            />
            <NaviButton
              type="button"
              name="수정"
              color="#4361ee"
              fontcolor="white"
              onClick={updateHandler}
            />
            <NaviButton
              type="button"
              name="삭제"
              color="#c0c0c0"
              fontcolor="white"
              onClick={deleteHandler}
            />
          </Buttons>
        )}
      </TaskNav>
    </>
  );
}

const TaskNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 43rem;
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
  gap: 0.8rem;
  align-items: center;
`;
