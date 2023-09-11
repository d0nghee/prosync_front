import BoardViewList from "./BoardViewList";
import TableViewList from "./TableViewList";
import RoadmapViewList from "./RoadmapViewList";
import { useLocation } from "react-router-dom";

export default function TasksList({ tasks }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "table";

  return (
    <div>
      {view === "board" && <BoardViewList tasks={tasks} />}
      {view === "table" && <TableViewList tasks={tasks} />}
      {view === "roadmap" && <RoadmapViewList tasks={tasks} />}
    </div>
  );
}
