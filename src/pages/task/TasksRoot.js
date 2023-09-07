import { Outlet } from "react-router-dom";

export default function TasksRoot() {
  return (
    <>
      <div>TASK ROOT</div>
      <Outlet />
    </>
  );
}
