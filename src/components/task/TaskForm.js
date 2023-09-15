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
import { getTaskStatusApi, getProjectMembersApi } from "../../util/api";
import "react-quill/dist/quill.snow.css";
import TaskStatus from "../task/TaskStatus";
import TaskStatusList from "./TaskStatusList";
import { useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import NewTaskStatus from "../../pages/task/NewTaskStatus";
import TaskMemberList from "./TaskMemberList";
import { AiOutlineUserAdd } from "react-icons/ai";
import { taskStatusActions } from "../../redux/reducers/taskStatus-slice";
import SimpleTaskMemberList from "../task/SimpleTaskMemberList";
import NaviButton from "../common/Button";

export default function TaskForm({ method, task, taskMembers }) {
  const [projectMembers, setProjectMembers] = useState();
  const params = useParams();
  const [showProjectMembers, setshowProjectMembers] = useState(false);
  const navigate = useNavigate();

  //TODO: 프로젝트 회원 전역 관리하기
  useEffect(() => {
    (async () => {
      setProjectMembers(await getProjectMembersApi(params.projectId));
    })();
  }, []);

  // 해당 프로젝트의 task status 목록 호출
  const submit = useSubmit();

  const classificationRef = useRef();
  const titleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const detailRef = useRef();

  const showStatusList = useSelector((state) => state.taskStatus.show);

  const [taskStatus, setTaskStatus] = useState({
    taskStatusId: task ? task.taskStatusId : "",
    taskStatus: task ? task.taskStatus : "",
    color: task ? task.color : "",
  });

  const updateTaskStatus = (newStatus) => {
    setTaskStatus((prv) => ({ ...prv, ...newStatus }));
  };

  useEffect(() => {
    (async () => {
      dispatch(
        taskStatusActions.setList(await getTaskStatusApi(params.projectId))
      );

      if (task) {
        dispatch(calendarActions.changeStartDate(task.startDate));
        dispatch(calendarActions.changeEndDate(task.endDate));
      }
    })();
  }, [params.projectId, task]);

  const saveHandler = () => {
    submit(
      {
        taskStatusId: taskStatus.taskStatusId,
        detail: detailRef.current.value,
        classification: classificationRef.current.value,
        title: titleRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
      },
      { method: method }
    );
  };

  // 캘린더
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.calendar.startDate);
  const endDate = useSelector((state) => state.calendar.endDate);
  const showCalendar = useSelector((state) => state.calendar.show);

  const calendarHandler = (event) => {
    const startDate = moment(event[0]).format("YYYY-MM-DD");
    const endDate = moment(event[1]).format("YYYY-MM-DD");
    dispatch(calendarActions.changeDatesAndShow({ startDate, endDate }));
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
      {showCalendar && <t.BackDrop onClick={toggleCalendar} />}
      {showModal && <NewTaskStatus onClose={showStatusModal} />}
      <t.TaskTotal>
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
        <t.TaskContents>
          <Form method={method}>
            <t.TaskArea>
              <t.MainTask>
                <div>
                  <h2>Write</h2>
                  <div>
                    <label htmlFor="detail" />
                    <t.MarkdownInput
                      theme="snow"
                      id="detail"
                      name="detail"
                      value={task ? task.detail : ""}
                      ref={detailRef}
                      placeholder="업무 내용을 입력하세요"
                    />
                  </div>
                </div>
                <t.ButtonArea>
                  <NaviButton
                    type="button"
                    onClick={() => navigate("..")}
                    name="취소"
                  />
                  <NaviButton
                    type="button"
                    onClick={saveHandler}
                    name="저장"
                    color="#4361ee"
                    fontcolor="white"
                  />
                </t.ButtonArea>
              </t.MainTask>

              <t.SideTask>
                <t.Container>
                  <div>
                    <t.SideName>
                      담당자
                      <AiOutlineUserAdd
                        size="25px"
                        onClick={() => setshowProjectMembers((prv) => !prv)}
                      />
                    </t.SideName>
                    {/* 업무 담당자 */}
                    {taskMembers && taskMembers.length > 0 ? (
                      <SimpleTaskMemberList taskMembers={taskMembers} />
                    ) : (
                      <div onClick={() => setshowProjectMembers((prv) => !prv)}>
                        업무 담당자를 등록하세요.
                      </div>
                    )}
                  </div>
                  {/* 업무 담당자 등록*/}
                  {showProjectMembers && (
                    <>
                      <t.BackDrop
                        onClick={() => setshowProjectMembers((prv) => !prv)}
                      />
                      <t.Wrapper show="true">
                        <TaskMemberList
                          taskMembers={projectMembers}
                          isCheckList="true"
                          assignedMembers={taskMembers}
                          toggleList={() =>
                            setshowProjectMembers((prv) => !prv)
                          }
                        />
                      </t.Wrapper>
                    </>
                  )}
                </t.Container>
                <div>
                  <t.SideName>분류</t.SideName>
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
                  <t.SideName>기간</t.SideName>
                  <t.Period>
                    <div>
                      <label htmlFor="startDate"></label>
                      <t.DateInput
                        id="startDate"
                        name="startDate"
                        type="text"
                        value={
                          startDate ? startDate : task ? task.startDate : ""
                        }
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
                  {showCalendar && (
                    <t.Wrapper show={showCalendar.toString()}>
                      <MyCalendar changeDate={calendarHandler} />
                    </t.Wrapper>
                  )}
                </t.Container>
                <t.Container>
                  <div>
                    <t.SideName>업무상태</t.SideName>
                    <t.TaskStatusBox
                      onClick={() => dispatch(taskStatusActions.toggleList())}
                    >
                      {taskStatus.taskStatusId ? (
                        <TaskStatus
                          color={taskStatus.color}
                          name={taskStatus.taskStatus}
                          width="100px"
                        />
                      ) : (
                        <t.ChooseStatusComment>
                          업무 상태를 선택하세요.
                        </t.ChooseStatusComment>
                      )}
                      <AiFillCaretDown size="27px" color="#6c757d" />
                    </t.TaskStatusBox>
                  </div>
                  {showStatusList && (
                    <>
                      <t.BackDrop
                        onClick={() => dispatch(taskStatusActions.toggleList())}
                      />
                      <t.Wrapper show="true">
                        <TaskStatusList
                          updateTaskStatus={updateTaskStatus}
                          showStatusModal={showStatusModal}
                        />
                      </t.Wrapper>
                    </>
                  )}
                </t.Container>
              </t.SideTask>
            </t.TaskArea>
          </Form>
        </t.TaskContents>
      </t.TaskTotal>
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
