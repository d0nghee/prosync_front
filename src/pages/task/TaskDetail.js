import React from "react";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { deleteApi, getApi } from "../../util/api";
import { useSubmit, Link, Form } from "react-router-dom";

export default function TaskDetail() {
  const data = useRouteLoaderData("task-details");
  const task = data.data.data;

  const submit = useSubmit();
  const taskDeleteHandler = () => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  };
  return (
    <div>
      <h2>{task.title}</h2>
      <div>
        {task.startDate} - {task.endDate}
      </div>
      <div>{task.classification}</div>
      <div>{task.taskStatus}</div>
      <div>{task.createdAt}</div>
      <menu>
        <Link to="edit">수정</Link>
        <Form method="delete">
          <button onClick={taskDeleteHandler}>삭제</button>
        </Form>
      </menu>
    </div>
  );
}

export async function loader({ params }) {
  const taskId = params.taskId;
  const response = await getApi(`/tasks/${taskId}`);
  return response;
}

export async function action({ params }) {
  deleteApi(`/tasks/${params.taskId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.error(error));

  return redirect("..");
}
