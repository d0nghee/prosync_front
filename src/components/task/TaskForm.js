import { useDispatch, useSelector } from "react-redux";
import {
  redirect,
  Form,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { calendarActions } from "../../redux/calendar-slice";
import axiosInstance from "../../util/axiosInstancs";
import MyCalendar from "../common/Calendar";
import moment from "moment/moment";
import * as t from "./TaskForm.style";
import { useEffect, useState } from "react";
import { getApi } from "../../util/api";

import "react-quill/dist/quill.snow.css";
import TaskStatus from "../task/TaskStatus";
import TaskStatusList from "./TaskStatusList";
import { useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";

export default function TaskForm({ method, task }) {
  // 해당 프로젝트의 task status 목록 호출
  const params = useParams();
  const projectId = params.projectId;
  const [taskStatusList, setTaskStatusList] = useState();
  const submit = useSubmit();

  const classificationRef = useRef();
  const titleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const [showStatusList, setShowStatusList] = useState(false);

  const [taskStatus, setTaskStatus] = useState({
    id: task ? task.taskStatusId : "",
    name: task ? task.taskStatus : "",
    color: task ? task.color : "",
  });

  const statusBoxChangeHandler = () => {
    setShowStatusList((prv) => !prv);
  };

  const updateTaskStatus = (newStatus) => {
    setTaskStatus(newStatus);
  };

  useEffect(() => {
    (async () => {
      const response = await getApi(`/projects/${projectId}/task-status`);
      const status = await response.data.data;
      setTaskStatusList(status);

      if (task) {
        dispatch(calendarActions.changeStartDate(task.startDate));
        dispatch(calendarActions.changeEndDate(task.endDate));
      }
    })();
  }, []);

  const saveHandler = () => {
    // detail 수정시 업데이트 안됨
    submit(
      {
        taskStatusId: taskStatus.id,
        detail: editorHtml,
        classification: classificationRef.current.value,
        title: titleRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
      },
      { method: method }
    );
  };

  // 취소 버튼
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("..");
  };

  // 마크다운
  const [editorHtml, setEditorHtml] = useState("");
  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  // 캘린더
  const dispatch = useDispatch();
  let startDate = useSelector((state) => state.calendar.startDate);
  let endDate = useSelector((state) => state.calendar.endDate);
  let show = useSelector((state) => state.calendar.show);

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
      <t.TaskArea>
        <t.MainTask>
          <div>
            <label htmlFor="title"></label>
            <t.TaskTitle
              type="text"
              id="title"
              name="title"
              required
              defaultValue={task ? task.title : ""}
              ref={titleRef}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div>
            <h2>Write</h2>
            <div>
              <label htmlFor="detail" />
              <t.MarkdownInput
                theme="snow"
                id="detail"
                name="detail"
                value={editorHtml ? editorHtml : task ? task.detail : ""}
                onChange={handleEditorChange}
                placeholder="업무 내용을 입력하세요"
              />
            </div>
          </div>
          <div>
            <button type="button" onClick={cancelHandler}>
              취소
            </button>
            <button onClick={saveHandler}>저장</button>
          </div>
        </t.MainTask>

        <t.SideTask>
          <div>
            <t.SideName>Classification</t.SideName>
            <t.SideInput
              type="text"
              id="classification"
              name="classification"
              defaultValue={task ? task.classification : ""}
              ref={classificationRef}
              placeholder="내용을 입력하세요"
            />
          </div>
          <t.Container>
            <t.SideName>Task Period</t.SideName>
            <t.Period>
              <div>
                <label htmlFor="startDate"></label>
                <t.DateInput
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={startDate ? startDate : task ? task.startDate : ""}
                  onClick={toggleCalendar}
                  ref={startDateRef}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="endDate"></label>
                <t.DateInput
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={endDate ? endDate : task ? task.endDate : ""}
                  onClick={toggleCalendar}
                  ref={endDateRef}
                  readOnly
                />
              </div>
            </t.Period>
            <t.CalendarWrapper show={show.toString()}>
              {show && <MyCalendar changeDate={changeDateHandler} />}
            </t.CalendarWrapper>
          </t.Container>
          <div>
            <t.SideName>Task Status</t.SideName>
            <t.TaskStatusBox onClick={statusBoxChangeHandler}>
              {taskStatus.id ? (
                <TaskStatus
                  color={taskStatus.color}
                  name={taskStatus.name}
                  width="100px"
                />
              ) : (
                <t.ChooseStatusComment>
                  업무 상태를 선택하세요.
                </t.ChooseStatusComment>
              )}
              <AiFillCaretDown size="27px" color="#6c757d" />
            </t.TaskStatusBox>
            {showStatusList && (
              <TaskStatusList
                taskStatusList={taskStatusList}
                updateTaskStatus={updateTaskStatus}
              />
            )}
          </div>
        </t.SideTask>
      </t.TaskArea>
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
    url += `/task-status/${data.get("taskStatusId")}`;
  }

  const taskData = {
    classification: data.get("classification"),
    title: data.get("title"),
    detail: data.get("detail"),
    startDate: data.get("startDate"),
    endDate: data.get("endDate"),
    taskStatusId: Number(data.get("taskStatusId")),
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
