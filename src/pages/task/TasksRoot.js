import { Outlet } from "react-router-dom";

export default function TasksRoot() {
  return (
    <>
      <div>taskroot</div>
      <Outlet />
    </>
  );
}
