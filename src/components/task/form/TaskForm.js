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

export default function TaskForm({ method, task, taskFiles, deleteFile }) {
  const commonErrror = {
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (error) => {
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate(`/auth?mode=login`);
    },
    403: (error) => {
      console.log(error.response.status);
      alert("해당 메뉴에 대한 접근 권한이 없습니다.");
      navigate("/");
    },
  };

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

  //TODO: 프로젝트쪽에서 프로젝트 회원 전역 관리하기
  useEffect(() => {
    tryFunc(
      async () => await getProjectMembersApi(params.projectId),
      (projectMembers) => setProjectMembers(projectMembers),
      commonErrror
    )();
  }, [params.projectId]);

  // FORM 유효성 검증
  const {
    value: classificationValue,
    isValid: classificationIsValid,
    setHandler: classificationSetHandler,
    changeHandler: classificationChangeHandler,
    blurHandler: classificationBlurHandler,
    hasError: classificationHasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: titleValue,
    isValid: titleIsValid,
    setHandler: titleSetHandler,
    changeHandler: titleChangeHandler,
    blurHandler: titleBlurHandler,
    hasError: titleHasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: detailValue,
    isValid: detailIsValid,
    setHandler: detailSetHandler,
    blurHandler: detailBlurHandler,
    hasError: detailHasError,
  } = useFormInput(
    (value) => value.trim() !== "" && value.trim() !== "<p><br></p>"
  );

  useEffect(() => {
    tryFunc(
      async () => await getTaskStatusApi(params.projectId),
      (list) => dispatch(taskStatusActions.setList(list)),
      commonErrror
    )();

    if (task) {
      dispatch(calendarActions.changeStartDate(task.startDate));
      dispatch(calendarActions.changeEndDate(task.endDate));
    }
  }, [params.projectId, task, dispatch]);

  const updateTaskStatus = (newStatus) => {
    setTaskStatus({ ...newStatus });
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    console.log("1", titleValue, "2", classificationValue, "3", detailValue);

    if (method === "POST" && !taskStatus) {
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

    if (method === "PATCH") {
      requestData.taskId = +params.taskId;
      await dispatch(
        requestApi(params.taskId, originalMembers, checkedMembers)
      );
      await dispatch(patchTask(params.taskId, requestData));
      dispatch(calendarActions.resetDate());
      navigate(`/projects/${projectId}/tasks/${params.taskId}`);
    } else if (method === "POST") {
      await tryFunc(
        () =>
          postTaskApi(params.projectId, taskStatus.taskStatusId, requestData),
        (taskId) => {
          navigate(`/projects/${projectId}/tasks/${taskId}`);
          dispatch(requestApi(taskId, originalMembers, checkedMembers));
        },
        commonErrror
      )();
    }
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
        commonErrror
      )();
    }
  };
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  return (
    <>
      {showCalendar && <t.BackDrop onClick={toggleCalendar} />}
      {showModal && (
        <NewTaskStatus onClose={() => setShowModal((prv) => !prv)} />
      )}
      <form method={method} onSubmit={saveHandler}>
        <t.TaskTotal>
          <t.DetailArea>
            {showErrorMessage && (
              <t.ErrorMessage>
                입력값이 잘못되었습니다. 다시 시도해주세요.
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
                </div>
                {taskFiles && taskFiles.length !== 0 && (
                  <div>
                    <div>현재 파일 목록</div>
                    <FileList fileList={taskFiles} deleteFile={deleteFile} />
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
                      <t.Wrapper show="true" customTop="110px">
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
                    value={classificationValue}
                    onChange={classificationChangeHandler}
                    onBlur={classificationBlurHandler}
                    isError={classificationHasError}
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
                    <t.Wrapper show={showCalendar.toString()} customTop="80px">
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
                      {task || (taskStatus && !taskStatus.error) ? (
                        <TaskStatus
                          color={taskStatus ? taskStatus.color : task.color}
                          name={
                            taskStatus ? taskStatus.taskStatus : task.taskStatus
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
                        onClick={() => dispatch(taskStatusActions.toggleList())}
                      />
                      {/* TODO: 인라인 스타일 수정 예정 */}
                      <t.Wrapper show="true" style={{ top: "105px" }}>
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
          </t.DetailArea>
        </t.TaskTotal>
      </form>
    </>
  );
}
