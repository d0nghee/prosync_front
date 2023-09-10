import { Link } from "react-router-dom";
import { styled } from "styled-components";
import TaskStatus from "./TaskStatus";
import { useDispatch } from "react-redux";
import { checkboxActions } from "../../redux/reducers/checkbox-slice";
import BoardViewList from "./BoardViewList";
import TableViewList from "./TableViewList";
import RoadmapViewList from "./RoadmapViewList";
import { useLocation } from "react-router-dom";

export default function TasksList({ tasks }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "table";

  //TODO: 체크박스 로직 추가하기
  const dispatch = useDispatch();
  const toggleCheckbox = (id) => {
    dispatch(checkboxActions.toggleCheckbox(id));
  };

  return (
    <div>
      <Header>
        <input type="checkbox" onChange={() => toggleCheckbox(0)} />
        <Title>
          <div>Title</div>
          <div>Assignees</div>
          <div>Last Updated</div>
          <div>Status</div>
          <div>Classification</div>
        </Title>
      </Header>
      {view === "board" && <BoardViewList tasks={tasks} />}
      {view === "table" && <TableViewList tasks={tasks} />}
      {view === "roadmap" && <RoadmapViewList tasks={tasks} />}
    </div>
  );
}

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
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  align-items: center;

  div {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
    overflow: hidden;
  }

  div:nth-child(1) {
    flex: 1.5;
  }
`;

const Item = styled.div`
  width: 85rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;

  input {
    width: 20px;
  }

  &:hover {
    background-color: #f0f0f0;
    color: #007bff;
    border-radius: 1.5rem;
  }
`;

const ContentLink = styled(Link)`
  display: flex;
  width: 83rem;
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  align-items: center;

  div {
    display: inline-block;
    flex: 1;
    margin-right: 1rem;
  }

  div:nth-child(1) {
    flex: 1.5;
  }

  div:nth-child(4) {
    flex: 0.7;
    margin-right: 5rem;
  }
`;
