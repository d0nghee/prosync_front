import BoardViewList from "./BoardViewList";
import TableViewList from "./TableViewList";
import RoadmapViewList from "./RoadmapViewList";
import { useSearchParams } from "react-router-dom";

export default function TasksList({ tasks }) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";

  return (
    <div>
      {view === "board" && <BoardViewList tasks={tasks} />}
      {view === "table" && <TableViewList tasks={tasks} />}
      {view === "roadmap" && <RoadmapViewList tasks={tasks} />}
    </div>
  );
}
