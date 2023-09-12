import { useDispatch, useSelector } from "react-redux";
import {
  redirect,
  Form,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import { calendarActions } from "../../redux/reducers/calendar-slice";
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
import NewTaskStatus from "../../pages/task/NewTaskStatus";
import TaskMemberList from "./TaskMemberList";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function TaskForm({ method, task}) {

  const [assignees, setAssignees] = useState();
  const [projectMembers, setProjectMembers] = useState();
  const params = useParams();
  const [showProjectMembers, setshowProjectMembers] = useState(false);


  //TODO: REDUX로 관리하기
  useEffect(() => {
    (async () => {
      if (method === 'PATCH') {
        const taskMemberRes = await getApi(`/tasks/${params.taskId}/members`);
        const members = await taskMemberRes.data.data;
        setAssignees(members);
      }      
      const projectMemberRes = await getApi(`/projects/${params.projectId}/members`);
      const projectMembers = await projectMemberRes.data.data;
      setProjectMembers(projectMembers);
    })();
  }, []);


  // 해당 프로젝트의 task status 목록 호출
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
  }, [projectId, task]);

  // 업무 상태리스트 업데이트
  const onRemove = (id) => {
    setTaskStatusList((prv) =>
      prv.filter((status) => status.taskStatusId !== id)
    );
  };

  const saveHandler = () => {
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

  //업무 상태 모달
  const [showModal, setShowModal] = useState(false);

  const showStatusModal = () => {
    setShowModal((prv) => !prv);
  };

  return (
    <>
      {showModal && <NewTaskStatus onClose={showStatusModal} />}
      <t.FormArea>
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
                <button onClick={saveHandler} type="button">
                  저장
                </button>
              </div>
            </t.MainTask>

            <t.SideTask>
              <div>
                <t.SideName>Assignees <AiOutlineUserAdd size="25px" onClick={() =>setshowProjectMembers((prv) => !prv)}/></t.SideName>
                {/* TODO: 업무담당자 조회 API 공통화 후 작업 ? */}
                {assignees && <TaskMemberList taskMembers={assignees} />}
              </div>
              {/* 프로젝트 멤버 */}
              {showProjectMembers && <TaskMemberList taskMembers={projectMembers}/>}
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
                    onRemove={onRemove}
                    taskStatusList={taskStatusList}
                    updateTaskStatus={updateTaskStatus}
                    showStatusModal={showStatusModal}
                  />
                )}
              </div>
            </t.SideTask>
          </t.TaskArea>
        </Form>
      </t.FormArea>
    </>
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

  const response = await axiosInstance(url, {
    method: method,
    data: taskData,
  });

  if (response.data) {
    const taskId = await response.data.data.taskId;
    return redirect(`/projects/${projectId}/tasks/${taskId}`);
  }
}
