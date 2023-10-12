import TaskStatus from "../common/TaskStatus";
import { useParams } from "react-router-dom";
import { useState } from "react";
import * as tv from "./TableViewList.style.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskMemberList from "../common/TaskMemberList";
import { FiEdit2 } from "react-icons/fi";
import * as t from "../form/TaskForm.style";
import TaskStatusList from "../common/TaskStatusList";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineCancel,
  MdDoneOutline,
} from "react-icons/md";
import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";
import { requestApi } from "../../../redux/reducers/task/taskMembers-slice";
import { patchTask } from "../../../redux/reducers/task/taskList-slice";
import ListLoadingSpinner from "../../common/ListLoadingSpinner";
import Guidance from "../../common/Guidance";
import { tryFunc } from "../../../util/tryFunc";
import { useNavigate } from "react-router-dom";
import NewTaskStatus from "../../../pages/task/NewTaskStatus";
import SimpleTaskMemberList from "../common/SimpleTaskMemberList";
import { getProjectMembersApi } from "../../../util/api";

export default function TableViewList({
  onChangePage,
  currentPage,
  updateCheckbox,
  checkbox,
  projectMember,
}) {
  const [showNewStatusModal, setShowNewStatusModal] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();
  const tasks = useSelector((state) => state.taskList.list);
  const pageInfo = useSelector((state) => state.taskList.pageInfo);
  const [projectMembers, setProjectMembers] = useState();

  useEffect(() => {
    tryFunc(
      () => getProjectMembersApi(params.projectId, { size: 100 }),
      (members) => setProjectMembers(members),
      dispatch
    )();
  }, [params.projectId]);

  const [showStatusModal, setShowStatusModal] = useState(false);

  // ------------------------------------ //

  const [showAssignees, setShowAssignees] = useState();

  // 체크박스
  useEffect(() => {
    updateCheckbox([]);
  }, [currentPage, params.projectId]);

  const isChecked = (taskId) => {
    return (
      checkbox.length !== 0 &&
      checkbox.filter((id) => id === taskId).length !== 0
    );
  };

  const toggleCheckbox = (id) => {
    // 배열에 있으면 삭제, 없으면 추가
    const findTaskId =
      checkbox.length !== 0 && checkbox.find((taskId) => taskId === id);
    if (findTaskId) {
      const newCheckbox = checkbox.filter((taskId) => taskId !== id);
      updateCheckbox(newCheckbox);
    } else {
      updateCheckbox((prv) => [...prv, id]);
    }
  };

  const toggleAllCheck = (event) => {
    const checked = event.target.checked;

    if (checked) {
      const taskIds = tasks.map((task) => task.taskId);
      updateCheckbox(taskIds);
    } else {
      updateCheckbox([]);
    }
  };

  const [editTaskId, setEditTaskId] = useState();

  // 페이지네이션
  const [startPage, setStartPage] = useState(1);
  const pagesToShow = 5;

  const totalPages = Array.from(
    { length: pageInfo.totalPages },
    (_, index) => index + 1
  );

  const generatePages = () => {
    const pages = [];
    for (
      let i = startPage;
      i <= Math.min(totalPages.length, startPage + pagesToShow - 1);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevClick = () => {
    if (startPage > 1) {
      setStartPage(startPage - pagesToShow);
    }
  };

  const handleNextClick = () => {
    if (startPage + pagesToShow <= totalPages.length) {
      setStartPage(startPage + pagesToShow);
    }
  };

  const [errorTaskId, setErrorTaskId] = useState();

  function isValidDateString(date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(date)) {
      return false;
    }

    // 날짜 유효성 검사
    const parts = date.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return false;
    }

    return true;
  }

  function validateDates(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // 시작일과 종료일이 유효한 날짜인지 확인
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return false;
    }

    // 시작일 < 종료일
    if (startDate > endDate) {
      return false;
    }

    return true;
  }

  const taskSaveHandler = (event, taskId) => {
    event.preventDefault();

    const title = event.target[0].value;
    const startDate = event.target[1].value;
    const endDate = event.target[2].value;
    const classification = event.target[3].value;
    const status = taskStatus ? taskStatus : null;

    // date 유효성 검사
    if (
      !isValidDateString(startDate) ||
      !isValidDateString(endDate) ||
      !validateDates(startDate, endDate)
    ) {
      setErrorTaskId(taskId);
      return;
    } else if (title.trim() === "" || title.length > 50) {
      // title => 1 ~ 50자 이내
      setErrorTaskId(taskId);
      return;
    } else if (classification.trim() === "" || classification.length > 20) {
      // classification => 1 ~ 20자 이내
      setErrorTaskId(taskId);
      return;
    }

    setEditTaskId(null);
    setErrorTaskId();

    const requestData = {
      title,
      startDate,
      endDate,
      classification,
      ...status,
    };

    (async () => {
      requestData.taskId = taskId;
      await dispatch(requestApi(+taskId, originalMembers, checkedMembers));
      await dispatch(
        patchTask(+taskId, { ...requestData, taskMembers: checkedMembers })
      );
    })();
    setTaskStatus(null);
  };

  const [taskStatus, setTaskStatus] = useState();

  const updateTaskStatus = (newStatus) => {
    setTaskStatus((prv) => ({ ...prv, ...newStatus }));
  };

  const cancelHandler = () => {
    setEditTaskId(null);
    setTaskStatus(null);
    setErrorTaskId();
    dispatch(taskMembersAction.resetCheckedMember());
  };

  const checkedMembers = useSelector(
    (state) => state.taskMembers.checkedMembers
  );

  const originalMembers = useSelector(
    (state) => state.taskMembers.originalMembers
  );

  const editButtonHandler = (taskId, taskMembers) => {
    setEditTaskId(taskId);
    setErrorTaskId();
    dispatch(taskMembersAction.setTaskMembers(taskMembers));
  };

  if (!pageInfo.hasOwnProperty("page")) {
    return <ListLoadingSpinner />;
  } else if (pageInfo.totalElements === 0) {
    return <Guidance text="업무가 존재하지 않습니다." />;
  }

  return (
    <>
      {showNewStatusModal && (
        <>
          <t.BackDrop onClick={() => setShowNewStatusModal(false)} />
          <NewTaskStatus onClose={() => setShowNewStatusModal(false)} />
        </>
      )}
      <tv.Header>
        {projectMember &&
          projectMember.status === "ACTIVE" &&
          (projectMember.authority === "ADMIN" ||
            projectMember.authority === "WRITER") && (
            <input type="checkbox" onChange={toggleAllCheck} />
          )}
        <tv.Title>
          <div>제목</div>
          <div>담당자</div>
          <div>진행 기간</div>
          <div>업무상태</div>
          <div>분류</div>
        </tv.Title>
      </tv.Header>

      {tasks &&
        tasks.length !== 0 &&
        tasks.map((task, idx) => (
          <div key={idx}>
            {errorTaskId === task.taskId && (
              <tv.ErrorMessage>
                입력값이 잘못되었습니다. 다시 시도해주세요.
              </tv.ErrorMessage>
            )}
            <tv.Item>
              {projectMember &&
                projectMember.status === "ACTIVE" &&
                (projectMember.authority === "ADMIN" ||
                  projectMember.authority === "WRITER") && (
                  <div>
                    <tv.CheckBox
                      type="checkbox"
                      onChange={() => toggleCheckbox(task.taskId)}
                      checked={isChecked(task.taskId)}
                    />
                  </div>
                )}
              {task.taskId !== editTaskId ? (
                <>
                  <tv.LinkContents
                    to={`${task.taskId}`}
                    writer={
                      projectMember &&
                      projectMember.status === "ACTIVE" &&
                      projectMember.authority !== "READER"
                    }
                  >
                    {task.title.length > 40 ? (
                      <div>{task.title.substring(0, 40)}...</div>
                    ) : (
                      <div>{task.title}</div>
                    )}
                    {task.taskMembers.length !== 0 ? (
                      <tv.Assignee>
                        <SimpleTaskMemberList
                          taskMembers={task.taskMembers}
                          taskId={task.taskId}
                          bottom="90px"
                        />
                      </tv.Assignee>
                    ) : (
                      <tv.Assignee>
                        <tv.Undefined>담당자 없음</tv.Undefined>
                      </tv.Assignee>
                    )}
                    <div>{`${task.startDate} ~ ${task.endDate}`}</div>
                    <tv.StatusBox>
                      <TaskStatus color={task.color} name={task.taskStatus} />
                    </tv.StatusBox>

                    <div>{task.classification}</div>
                  </tv.LinkContents>
                  {projectMember &&
                    projectMember.status === "ACTIVE" &&
                    (projectMember.authority === "ADMIN" ||
                      projectMember.authority === "WRITER") && (
                      <tv.EditButton
                        type="button"
                        onClick={() =>
                          editButtonHandler(task.taskId, task.taskMembers)
                        }
                      >
                        <FiEdit2 />
                      </tv.EditButton>
                    )}
                </>
              ) : (
                // 수정버튼 클릭시
                <>
                  <form
                    action="patch"
                    onSubmit={(event) => taskSaveHandler(event, task.taskId)}
                  >
                    <tv.EditArea>
                      <tv.Contents>
                        <tv.TaskInput
                          type="text"
                          defaultValue={task.title}
                          disabled={false}
                        />
                        <tv.ModalSection>
                          {task.taskMembers && task.taskMembers.length !== 0 ? (
                            <tv.Assignee
                              onClick={() => setShowAssignees((prv) => !prv)}
                            >
                              <SimpleTaskMemberList
                                taskMembers={task.taskMembers}
                                taskId={task.taskId}
                                isTable="true"
                              />
                            </tv.Assignee>
                          ) : (
                            <div
                              onClick={() => setShowAssignees((prv) => !prv)}
                            >
                              <tv.Assignee>
                                <tv.Undefined>담당자 없음</tv.Undefined>
                              </tv.Assignee>
                            </div>
                          )}
                          {showAssignees && (
                            <div>
                              <t.BackDrop
                                onClick={() => setShowAssignees((prv) => !prv)}
                              />
                              <t.Wrapper show="true" customtop="100px">
                                <TaskMemberList
                                  taskMembers={projectMembers}
                                  isCheckList="true"
                                  toggleList={() =>
                                    setShowAssignees((prv) => !prv)
                                  }
                                  taskId={task.taskId}
                                />
                              </t.Wrapper>
                            </div>
                          )}
                        </tv.ModalSection>

                        <tv.DateInput>
                          <div>
                            <tv.TaskInput
                              type="text"
                              defaultValue={task.startDate}
                              disabled={false}
                            />
                          </div>
                          <div>
                            <tv.TaskInput
                              type="text"
                              defaultValue={task.endDate}
                              disabled={false}
                            />
                          </div>
                        </tv.DateInput>

                        <div>
                          <tv.StatusBox
                            edit="true"
                            onClick={() => setShowStatusModal((prv) => !prv)}
                          >
                            <TaskStatus
                              color={taskStatus ? taskStatus.color : task.color}
                              name={
                                taskStatus
                                  ? taskStatus.taskStatus
                                  : task.taskStatus
                              }
                            />
                          </tv.StatusBox>
                          {showStatusModal && (
                            <>
                              <t.BackDrop
                                onClick={() => setShowStatusModal(false)}
                              />
                              <t.Wrapper show="true" customtop="100px">
                                <TaskStatusList
                                  updateTaskStatus={updateTaskStatus}
                                  showStatusModal={() =>
                                    setShowNewStatusModal(true)
                                  }
                                />
                              </t.Wrapper>
                            </>
                          )}
                        </div>
                        <tv.TaskInput
                          type="text"
                          defaultValue={task.classification}
                          disabled={task.taskId !== editTaskId}
                        />
                      </tv.Contents>
                      <tv.Buttons>
                        <button type="button" onClick={() => cancelHandler()}>
                          <MdOutlineCancel />
                        </button>
                        <button>
                          <MdDoneOutline />
                        </button>
                      </tv.Buttons>
                    </tv.EditArea>
                  </form>
                </>
              )}
            </tv.Item>
          </div>
        ))}
      {tasks && tasks.length !== 0 && (
        <tv.Box>
          <tv.PageButton
            onClick={handlePrevClick}
            disabled={startPage === 1}
            type="button"
          >
            <MdNavigateBefore />
          </tv.PageButton>
          {generatePages().map((pageNum) => (
            <tv.PageButton
              key={pageNum}
              type="button"
              onClick={() => onChangePage(pageNum)}
              active={pageNum === currentPage}
            >
              {pageNum}
            </tv.PageButton>
          ))}
          <tv.PageButton
            onClick={handleNextClick}
            disabled={startPage + pagesToShow > totalPages}
            type="button"
          >
            <MdNavigateNext />
          </tv.PageButton>
        </tv.Box>
      )}
    </>
  );
}
