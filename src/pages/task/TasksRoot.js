import { Outlet } from "react-router-dom";

export default function TasksRoot() {
  return (
    <>
      <div style={{ margin: "10rem" }}> 프로젝트 이름 </div>
      <Outlet />
    </>
  );
}
