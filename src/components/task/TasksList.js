import BoardViewList from "./BoardViewList";
import TableViewList from "./TableViewList";
import RoadmapViewList from "./RoadmapViewList";
import { useSearchParams } from "react-router-dom";

export default function TasksList({ onChangePage, tasks }) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  console.log("task list컴포넌트 실행", tasks);

  return (
    <>
      {tasks && (
        <div>
          {view === "board" && <BoardViewList />}
          {view === "table" && (
            <TableViewList onChangePage={onChangePage} tasks={tasks} />
          )}
          {view === "roadmap" && <RoadmapViewList />}
        </div>
      )}
    </>
  );
}
