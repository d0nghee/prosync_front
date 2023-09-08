import { styled } from "styled-components";
import BoardViewList from "./BoardViewList";
import { useLocation } from "react-router-dom";
import TableViewList from "./TableViewList";
import RoadmapViewList from "./RoadmapViewList";

export default function TasksList({ tasks }) {
  //TODO: 체크박스 로직 추가하기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "table";

  return (
    <ViewListArea>
      <Header>
        <input type="checkbox" />
        <div>
          <span>Task</span>
          <span>Assignees</span>
          <span>Last Updated</span>
          <span>Task Status</span>
          <span>Classification</span>
        </div>
      </Header>
      {view === "board" && <BoardViewList tasks={tasks} />}
      {view === "table" && <TableViewList tasks={tasks} />}
      {view === "roadmap" && <RoadmapViewList tasks={tasks} />}
    </ViewListArea>
  );
}

const ViewListArea = styled.div`
  margin-bottom: 5rem;
`;

const Header = styled.div`
  width: 85rem;
  height: 5rem;
  margin: 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  font-weight: bold;

  input {
    width: 20px;
  }

  div {
    display: flex;
    width: 83rem;
    border-radius: 1rem;
    margin: 0 0.5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }

  div > span {
    flex: 1;
    margin-right: 5rem;
  }

  div > span:nth-child(1) {
    flex: 1.5;
  }

  div > span:nth-child(4) {
    flex: 0.7;
  }
`;
