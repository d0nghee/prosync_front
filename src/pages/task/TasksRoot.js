import React from "react";
import { Outlet } from "react-router-dom";

export default function TasksRoot() {
  return (
    <>
      <div>TasksRoot</div>
      <Outlet />
    </>
  );
}
