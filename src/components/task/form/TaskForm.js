import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { calendarActions } from "../../../redux/reducers/task/calendar-slice";
import MyCalendar from "../../common/Calendar";
import moment from "moment/moment";
import * as t from "./TaskForm.style";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import TaskStatus from "../common/TaskStatus";
import TaskStatusList from "../common/TaskStatusList";
import { AiFillCaretDown } from "react-icons/ai";
import NewTaskStatus from "../../../pages/task/NewTaskStatus";
import TaskMemberList from "../common/TaskMemberList";
import { AiOutlineUserAdd } from "react-icons/ai";
import { taskStatusActions } from "../../../redux/reducers/task/taskStatus-slice";
import SimpleTaskMemberList from "../common/SimpleTaskMemberList";
import NaviButton from "../../common/Button";
import { requestApi } from "../../../redux/reducers/task/taskMembers-slice";
import {
  postFileApi,
  getTaskStatusApi,
  getProjectMembersApi,
  postTaskApi,
} from "../../../util/api";
import FileList from "../../file/FileList";
import SelectedFiles from "../../file/SelectedFiles";
import { patchTask } from "../../../redux/reducers/task/taskList-slice";
import useFormInput from "../../../hooks/use-form-input";
import { tryFunc } from "../../../util/tryFunc";
import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";
import { removeUserCookie } from "../../../util/cookies";

export default function TaskForm({ method, task, taskFiles, deleteFile }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projectMembers, setProjectMembers] = useState();
  const [showProjectMembers, setShowProjectMembers] = useState(false);
  const showStatusList = useSelector((state) => state.taskStatus.show);
  const [taskStatus, setTaskStatus] = useState();

  const checkedMembers = useSelector(
    (state) => state.taskMembers.checkedMembers
  );

  const originalMembers = useSelector(
    (state) => state.taskMembers.originalMembers
  );

  useEffect(() => {
    tryFunc(
      async () => await getProjectMembersApi(params.projectId, { size: 1000 }),
      (projectMembers) => setProjectMembers(projectMembers),
      dispatch
    )();
    if (method === "POST") {
      dispatch(taskMembersAction.setTaskMembers([]));
      dispatch(calendarActions.resetDate());
    }
  }, [params.projectId]);

  // FORM 유효성 검증
  const {
    value: classificationValue,
    isValid: classificationIsValid,
    setHandler: classificationSetHandler,
    changeHandler: classificationChangeHandler,
    blurHandler: classificationBlurHandler,
    hasError: classificationHasError,
  } = useFormInput((value) => value.trim() !== "" && value.length <= 20);

  const {
    value: titleValue,
    isValid: titleIsValid,
    setHandler: titleSetHandler,
    changeHandler: titleChangeHandler,
    blurHandler: titleBlurHandler,
    hasError: titleHasError,
  } = useFormInput((value) => value.trim() !== "" && value.length <= 50);

  const {
    value: detailValue,
    isValid: detailIsValid,
    setHandler: detailSetHandler,
    blurHandler: detailBlurHandler,
    hasError: detailHasError,
  } = useFormInput(
    (value) =>
      value.replace(/<[^>]*>/g, "").trim() !== "" &&
      value.replace(/<[^>]*>/g, "").length <= 1000
  );

  useEffect(() => {
    tryFunc(
      async () => await getTaskStatusApi(params.projectId),
      (list) => dispatch(taskStatusActions.setList(list)),
      dispatch
    )();

    if (task) {
      dispatch(calendarActions.changeStartDate(task.startDate));
      dispatch(calendarActions.changeEndDate(task.endDate));
    }
  }, [params.projectId, task, dispatch]);

  const updateTaskStatus = (newStatus) => {
    setTaskStatus({ ...newStatus });
  };

  const saveHandler = (event) => {
    event.preventDefault();

    if (
      (method === "POST" && !taskStatus) ||
      (taskStatus && taskStatus.error)
    ) {
      setTaskStatus({ error: true });
      setShowErrorMessage(true);
      return;
    }
    if (!titleIsValid || !classificationIsValid || !detailIsValid) {
      setShowErrorMessage(true);
      return;
    }

    const projectId = params.projectId;

    const fileIds =
      selectedFiles.length !== 0
        ? selectedFiles.map((file) => file.fileId)
        : [];

    const requestData = {
      taskStatusId: taskStatus ? taskStatus.taskStatusId : null,
      detail: detailValue,
      classification: classificationValue,
      title: titleValue,
      startDate: startDate,
      endDate: endDate,
      fileIds,
    };

    (async () => {
      if (method === "PATCH") {
        requestData.taskId = +params.taskId;
        //TODO: 쿠키 토큰 삭제시 alert창 2번 발생 오류 확인
        await dispatch(
          requestApi(params.taskId, originalMembers, checkedMembers)
        );
        await dispatch(patchTask(params.taskId, requestData));
        dispatch(calendarActions.resetDate());
        navigate(`/projects/${projectId}/tasks/${params.taskId}`);
      } else if (method === "POST") {
        try {
          const taskId = await postTaskApi(
            params.projectId,
            taskStatus.taskStatusId,
            requestData
          );
          await dispatch(requestApi(taskId, originalMembers, checkedMembers));
          navigate(`/projects/${projectId}/tasks/${taskId}`);
        } catch (error) {
          const status = error.response.status;
          if (status === 401) {
            alert("로그인이 만료되었습니다.");
            removeUserCookie();
            navigate("/login");
          } else if (status === 500) {
            navigate("/error");
          } else if (status === 403) {
            alert("메뉴에 대한 권한이 없습니다.");
            navigate("/");
          }
        }
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
      dispatch(calendarActions.changeStartDate(task.startDate));
      dispatch(calendarActions.changeEndDate(task.endDate));
      classificationSetHandler(task.classification);
      titleSetHandler(task.title);
      detailSetHandler(task.detail);
      //TODO
      setTaskStatus({
        taskStatusId: task.taskStatusId,
        taskStatus: task.taskStatus,
        color: task.color,
      });
    }
  }, [task]);

  // 파일
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    const fileList = event.target.files;

    if (fileList && fileList.length !== 0) {
      // api 요청
      tryFunc(
        () => postFileApi(fileList),
        (files) => setSelectedFiles((prv) => [...prv, ...files]),
        dispatch
      )();
    }
  };
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  return (
    <>
      {showCalendar && <t.BackDrop onClick={toggleCalendar} />}
      {showModal && (
        <NewTaskStatus
          onClose={() => setShowModal((prv) => !prv)}
          updateStatusForForm={(value) => setTaskStatus(value)}
          currentStatusId={taskStatus && taskStatus.taskStatusId}
        />
      )}
      <form method={method} onSubmit={saveHandler}>
        <t.TaskTotal marginbtm={method === "POST" ? "15rem" : ""}>
          <t.DetailArea>
            {showErrorMessage && (
              <t.ErrorMessage>
                입력값이 잘못되었습니다. 다시 확인해주세요.
              </t.ErrorMessage>
            )}
            <t.TopNav>
              <t.TaskTitle
                type="text"
                id="title"
                name="title"
                value={titleValue}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                placeholder="제목을 입력하세요"
                isError={titleHasError}
              />
              <t.ButtonArea>
                <NaviButton
                  type="button"
                  onClick={() => navigate("..")}
                  name="취소"
                />
                <NaviButton name="저장" color="#4361ee" fontcolor="white" />
              </t.ButtonArea>
            </t.TopNav>
            {titleHasError && (
              <t.OneErrorMessage>
                제목은 1자 이상 50자 이내로 입력해주세요.
              </t.OneErrorMessage>
            )}
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
                      value={detailValue}
                      onBlur={detailBlurHandler}
                      onChange={detailSetHandler}
                      placeholder="업무 내용을 입력하세요"
                      isError={detailHasError}
                    />
                  </div>
                  {detailHasError && (
                    <t.OneErrorMessage>
                      상세내용은 1자 이상 1000자 이내로 입력해주세요.
                    </t.OneErrorMessage>
                  )}
                </div>
                {taskFiles && taskFiles.length !== 0 && (
                  <div>
                    <div>현재 파일 목록</div>
                    <FileList
                      fileList={taskFiles}
                      deleteFile={deleteFile}
                      deleteButton={true}
                    />
                  </div>
                )}
                <div>
                  <t.FileInputContainer>
                    <t.StyledButton type="button">Choose a File</t.StyledButton>
                    <t.StyledFileInput
                      type="file"
                      onChange={handleFileChange}
                      multiple
                    />
                  </t.FileInputContainer>
                  {selectedFiles && selectedFiles.length !== 0 && (
                    <SelectedFiles
                      files={selectedFiles}
                      updateFiles={(files) => setSelectedFiles(files)}
                    />
                  )}
                </div>
              </t.MainTask>

              <t.SideTask>
                <div>
                  <t.Container>
                    <div>
                      <t.SideName>
                        담당자
                        <AiOutlineUserAdd
                          size="23px"
                          className="logo"
                          onClick={() => setShowProjectMembers((prv) => !prv)}
                        />
                      </t.SideName>
                      {/* 업무 담당자 */}
                      {checkedMembers && checkedMembers.length > 0 ? (
                        <div
                          onClick={() => setShowProjectMembers((prv) => !prv)}
                        >
                          <SimpleTaskMemberList
                            taskMembers={checkedMembers}
                            taskId={task ? task.taskId : undefined}
                            isTable="true"
                          />
                        </div>
                      ) : (
                        <div
                          style={{ paddingBottom: "10px" }}
                          onClick={() => setShowProjectMembers((prv) => !prv)}
                        >
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
                        <t.Wrapper show="true" customtop="110px">
                          <TaskMemberList
                            taskMembers={projectMembers}
                            isCheckList="true"
                            toggleList={() =>
                              setShowProjectMembers((prv) => !prv)
                            }
                            taskId={task ? task.taskId : ""}
                          />
                        </t.Wrapper>
                      </>
                    )}
                  </t.Container>
                </div>

                <div>
                  <div>
                    <t.SideName>분류</t.SideName>
                    <t.SideInput
                      type="text"
                      id="classification"
                      name="classification"
                      value={classificationValue}
                      onChange={classificationChangeHandler}
                      onBlur={classificationBlurHandler}
                      isError={classificationHasError}
                      placeholder="내용을 입력하세요"
                    />
                  </div>
                  {classificationHasError && (
                    <t.OneErrorMessage>
                      분류는 1자 이상 20자 이내로 입력해주세요.
                    </t.OneErrorMessage>
                  )}
                </div>
                <div>
                  <t.Container>
                    <t.SideName>기간</t.SideName>
                    <t.Period>
                      <div>
                        <label htmlFor="startDate"></label>
                        <t.DateInput
                          id="startDate"
                          name="startDate"
                          type="text"
                          value={startDate}
                          onClick={toggleCalendar}
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="endDate"></label>
                        <t.DateInput
                          id="endDate"
                          name="endDate"
                          type="text"
                          value={endDate}
                          onClick={toggleCalendar}
                          readOnly
                        />
                      </div>
                    </t.Period>
                    {showCalendar && (
                      <t.Wrapper
                        show={showCalendar.toString()}
                        customtop="91px"
                      >
                        <MyCalendar changeDate={calendarHandler} />
                      </t.Wrapper>
                    )}
                  </t.Container>
                </div>
                <div>
                  <t.Container>
                    <div>
                      <t.SideName>업무상태</t.SideName>
                      <t.TaskStatusBox
                        onClick={() => dispatch(taskStatusActions.toggleList())}
                      >
                        {task || (taskStatus && !taskStatus.error) ? (
                          <TaskStatus
                            color={taskStatus ? taskStatus.color : task.color}
                            name={
                              taskStatus
                                ? taskStatus.taskStatus
                                : task.taskStatus
                            }
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
                          onClick={() =>
                            dispatch(taskStatusActions.toggleList())
                          }
                        />
                        <t.Wrapper show="true" customtop="105px">
                          <TaskStatusList
                            updateTaskStatus={updateTaskStatus}
                            showStatusModal={() => setShowModal((prv) => !prv)}
                            currentStatusId={
                              taskStatus ? taskStatus.taskStatusId : null
                            }
                          />
                        </t.Wrapper>
                      </>
                    )}
                  </t.Container>
                  {taskStatus && taskStatus.error && (
                    <t.OneErrorMessage>
                      업무 상태는 필수 입력 값입니다.
                    </t.OneErrorMessage>
                  )}
                </div>
              </t.SideTask>
            </t.TaskArea>
          </t.DetailArea>
        </t.TaskTotal>
      </form>
    </>
  );
}
