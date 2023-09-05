import React from "react";
import { redirect, Form } from "react-router-dom";
import axiosInstance from "../../util/axiosInstancs";
import CustomCalendar from "../common/Calendar";

export default function TaskForm({ method, task }) {
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
    </Form>
  );
}

export async function loader({ request, params }) {
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
      if (response.status === 200 || response.status === 201) {
        return response;
      }
    })
    .catch((error) => console.log(error));

  return redirect(`/projects/${projectId}/tasks`);
}
