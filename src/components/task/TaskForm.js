import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { calendarActions } from "../../redux/reducers/calendar-slice";
import MyCalendar from "../common/Calendar";
import moment from "moment/moment";
import * as t from "./TaskForm.style";
import { useEffect, useState } from "react";
import {
  getTaskStatusApi,
  getProjectMembersApi,
  patchTaskApi,
  postTaskApi,
} from "../../util/api";
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
import { requestApi } from "../../redux/reducers/taskMembers-slice";

export default function TaskForm({ method, task }) {
  const [projectMembers, setProjectMembers] = useState();
  const params = useParams();
  const [showProjectMembers, setShowProjectMembers] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState("");

  //TODO: 프로젝트쪽에서 프로젝트 회원 전역 관리하기
  useEffect(() => {
    (async () => {
      setProjectMembers(await getProjectMembersApi(params.projectId));
    })();
  }, [params.projectId]);

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

  const checkedMembers = useSelector(
    (state) => state.taskMembers.checkedMembers
  );

  const originalMembers = useSelector(
    (state) => state.taskMembers.originalMembers
  );

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
  }, [params.projectId, task, dispatch]);

  const saveHandler = (event) => {
    event.preventDefault();

    (async () => {
      const projectId = params.projectId;

      const requestData = {
        taskStatusId: taskStatus.taskStatusId,
        detail: method === "POST" ? details : detailRef.current.value,
        classification: classificationRef.current.value,
        title: titleRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
      };

      if (method === "PATCH") {
        await patchTaskApi(params.taskId, requestData);
        // dispatch(
        //   patchTask(params.taskId, {
        //     ...requestData,
        //     taskMembers: checkedMembers,
        //     taskId: params.taskId,
        //   })
        // ).then((res) => {
        //   const taskId = res;
        dispatch(requestApi(params.taskId, originalMembers, checkedMembers));
        navigate(`/projects/${projectId}/tasks/${params.taskId}`);
        // });
      } else if (method === "POST") {
        const taskId = await postTaskApi(
          params.projectId,
          taskStatus.taskStatusId,
          requestData
        );
        navigate(`/projects/${projectId}/tasks/${taskId}`);
        //   dispatch(
        //     postTask(projectId, taskStatus.taskStatusId, {
        //       ...requestData,
        //       taskMembers: checkedMembers,
        //     })
        //   ).then((res) => {
        //     const taskId = res;
        dispatch(requestApi(taskId, originalMembers, checkedMembers));
        //     redirect(`/projects/${projectId}/tasks/${taskId}`);
        //   });
      }
    })();
  };

  // 캘린더
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

  useEffect(() => {
    if (task) {
      setDetails(task.detail);
    }
  }, [task]);

  return (
    <>
      {showCalendar && <t.BackDrop onClick={toggleCalendar} />}
      {showModal && (
        <NewTaskStatus onClose={() => setShowModal((prv) => !prv)} />
      )}
      <t.TaskTotal>
        <t.DetailArea>
          <t.TopNav>
            <t.TaskTitle
              type="text"
              id="title"
              name="title"
              required
              defaultValue={task ? task.title : ""}
              ref={titleRef}
              placeholder="제목을 입력하세요"
            />
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
          </t.TopNav>

          <form method={method} onSubmit={saveHandler}>
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
                      value={details}
                      ref={detailRef}
                      placeholder="업무 내용을 입력하세요"
                      onChange={(value) => {
                        setDetails(value);
                      }}
                    />
                  </div>
                </div>
              </t.MainTask>

              <t.SideTask>
                <t.Container>
                  <div>
                    <t.SideName>
                      담당자
                      <AiOutlineUserAdd
                        size="20px"
                        className="logo"
                        onClick={() => setShowProjectMembers((prv) => !prv)}
                      />
                    </t.SideName>
                    {/* 업무 담당자 */}
                    {checkedMembers && checkedMembers.length > 0 ? (
                      <SimpleTaskMemberList taskMembers={checkedMembers} />
                    ) : (
                      <div onClick={() => setShowProjectMembers((prv) => !prv)}>
                        업무 담당자를 등록하세요.
                      </div>
                    )}
                  </div>
                  {/* 업무 담당자 등록*/}
                  {showProjectMembers && (
                    <>
                      <t.BackDrop
                        onClick={() => setShowProjectMembers((prv) => !prv)}
                      />
                      <t.Wrapper show="true">
                        <TaskMemberList
                          taskMembers={projectMembers}
                          isCheckList="true"
                          toggleList={() =>
                            setShowProjectMembers((prv) => !prv)
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
                          showStatusModal={() => setShowModal((prv) => !prv)}
                        />
                      </t.Wrapper>
                    </>
                  )}
                </t.Container>
              </t.SideTask>
            </t.TaskArea>
          </form>
        </t.DetailArea>
      </t.TaskTotal>
    </>
  );
}
