import { useDispatch, useSelector } from "react-redux";
import { redirect, Form, useNavigate } from "react-router-dom";
import { calendarActions } from "../../redux/store/calendar-slice";
import axiosInstance from "../../util/axiosInstancs";
import MyCalendar from "../common/Calendar";
import moment from "moment/moment";

export default function TaskForm({ method, task }) {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("..");
  };

  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.calendar.startDate);
  const endDate = useSelector((state) => state.calendar.endDate);
  const show = useSelector((state) => state.calendar.show);

  const changeDateHandler = (event) => {
    dispatch(
      calendarActions.changeStartDate(moment(event[0]).format("YYYY-MM-DD"))
    );
    dispatch(
      calendarActions.changeEndDate(moment(event[1]).format("YYYY-MM-DD"))
    );
    dispatch(calendarActions.toggleCalendar());
  };

  const toggleCalendar = () => {
    dispatch(calendarActions.toggleCalendar());
  };

  return (
    <Form method={method}>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={task ? task.title : ""}
        />
      </div>
      <div>
        <label htmlFor="classification">Classification</label>
        <input
          type="text"
          id="classification"
          name="classification"
          defaultValue={task ? task.classification : ""}
        />
      </div>
      <div>
        <label htmlFor="detail">detail</label>
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="상세 내용을 입력하세요."
          defaultValue={task ? task.detail : ""}
        />
      </div>
      <div>
        <div>
          <label htmlFor="startDate"></label>
          <input
            id="startDate"
            name="startDate"
            type="text"
            disabled={true}
            value={startDate ? startDate : task ? task.startDate : ""}
          />
        </div>
        <div>
          <label htmlFor="endDate"></label>
          <input
            id="endDate"
            name="endDate"
            type="text"
            disabled={true}
            value={endDate ? endDate : task ? task.endDate : ""}
          />
        </div>
        <button type="button" onClick={toggleCalendar}>
          날짜수정
        </button>
        {show && <MyCalendar changeDate={changeDateHandler} />}
      </div>
      <div>
        <label htmlFor="taskStatus">Progress</label>
        <div>{task ? task.taskStatus : ""}</div>
      </div>
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
    url = `/tasks/${params.taskId}`;
  } else if (method === "POST") {
    url += `/task-status/${params.taskStatusId}`;
  }

  //TODO: date 값 확인
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
