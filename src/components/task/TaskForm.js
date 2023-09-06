import React from "react";
import { redirect, Form, useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstancs";

export default function TaskForm({ method, task }) {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("..");
  };
  return (
    <Form method={method}>
      <p>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={task ? task.title : ""}
        />
      </p>
      <p>
        <label htmlFor="classification">Classification</label>
        <input
          type="text"
          id="classification"
          name="classification"
          defaultValue={task ? task.classification : ""}
        />
      </p>
      <p>
        <label htmlFor="detail"></label>
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="상세 내용을 입력하세요."
          defaultValue={task ? task.detail : ""}
        />
      </p>
      <p>
        {/* TODO: 캘린더  */}
        <div>
          <label htmlFor="startDate"></label>
          <span>{task ? task.startDate : ""} - </span>
        </div>
        <div>
          <label htmlFor="endDate"></label>
          <span>{task ? task.endDate : ""}</span>
        </div>
      </p>
      <p>
        <label htmlFor="taskStatus">Progress</label>
        <div>{task ? task.taskStatus : ""}</div>
      </p>
      <div>
        <button type="button" onClick={cancelHandler}>
          취소
        </button>
        <button>저장</button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const method = request.method;
  const projectId = params.projectId;

  const data = await request.formData();
  let url = `/projects/${projectId}/tasks`;

  if (method === "PATCH") {
    url += `/${params.taskId}`;
  } else if (method === "POST") {
    url += `/task-status/${params.taskStatusId}`;
  }

  const taskData = {
    classification: data.get("classification"),
    title: data.get("title"),
    detail: data.get("detail"),
    seq: data.get("seq"),
    startDate: data.get("startDate"),
    endDate: data.get("endDate"),
  };

  await axiosInstance(url, {
    method: method,
    data: taskData,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));

  return redirect(`/projects/${projectId}/tasks`);
}
