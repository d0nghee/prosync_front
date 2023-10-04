import { useNavigate, useParams } from "react-router-dom";
import * as t from "./TaskForm.style";
import TaskStatus from "../common/TaskStatus";
import { styled } from "styled-components";
import SimpleTaskMemberList from "../common/SimpleTaskMemberList";
import NaviButton from "../../common/Button";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/reducers/task/taskList-slice";
import FileList from "../../file/FileList";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function Task({ task, taskFiles, deleteFile, projectMember }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const pageInfo = useSelector((state) => state.taskList.pageInfo);

  const taskDeleteHandler = () => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      dispatch(
        deleteTask(params.taskId, params.projectId, { page: pageInfo.page })
      );
      navigate("..");
    }
  };

  if (!task) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {task && (
        <t.TaskTotal>
          <t.DetailArea>
            <t.TopNav>
              <TaskTitle>{task.data.title}</TaskTitle>
              <t.ButtonArea>
                <NaviButton
                  name="목록"
                  type="button"
                  onClick={() => navigate("..")}
                />
                {projectMember &&
                  (projectMember.authority === "ADMIN" ||
                    projectMember.authority === "WRITER") && (
                    <>
                      <NaviButton
                        type="button"
                        name="수정"
                        color="#4361ee"
                        fontcolor="white"
                        to="edit"
                        onClick={() => navigate("edit")}
                      />
                      <NaviButton
                        type="submit"
                        name="삭제"
                        color="#ca5329"
                        fontcolor="white"
                        onClick={taskDeleteHandler}
                      />
                    </>
                  )}
              </t.ButtonArea>
            </t.TopNav>
            <t.TaskArea>
              <t.MainTask>
                <TaskInfos>
                  <TaskInfo>생성일자 : {task.data.createdAt}</TaskInfo>
                  <TaskInfo>최근 수정일자 : {task.data.modifiedAt}</TaskInfo>
                  <TaskInfo>업무 담당자 : {task.taskMembers.length}명</TaskInfo>
                  <TaskInfo>
                    첨부 파일 :{" "}
                    {taskFiles.length !== 0 ? `${taskFiles.length}개` : "없음"}
                  </TaskInfo>
                </TaskInfos>
                <div>
                  <TaskDetails
                    dangerouslySetInnerHTML={{ __html: `${task.data.detail}` }}
                  />
                </div>

                <div>
                  <t.FileInputContainer>
                    <div>현재 파일 목록</div>
                    {taskFiles && taskFiles.length !== 0 && (
                      <FileList
                        fileList={taskFiles}
                        deleteFile={deleteFile}
                        projectMember={projectMember}
                      />
                    )}
                  </t.FileInputContainer>
                </div>
              </t.MainTask>
              <t.SideTask>
                <div>
                  <t.SideName>담당자</t.SideName>
                  {task.taskMembers.length > 0 ? (
                    <SimpleTaskMemberList taskMembers={task.taskMembers} />
                  ) : (
                    <div>지정된 담당자가 없습니다.</div>
                  )}
                </div>
                <div>
                  <t.SideName>분류</t.SideName>
                  <Text>{task.data.classification}</Text>
                </div>
                <div>
                  <t.SideName>기간</t.SideName>
                  <div>
                    {task.data.startDate} ~ {task.data.endDate}
                  </div>
                </div>
                <div>
                  <t.SideName>업무상태</t.SideName>
                  <t.TaskStatusBox>
                    <TaskStatus
                      color={task.data.color}
                      name={task.data.taskStatus}
                      width="100px"
                    />
                  </t.TaskStatusBox>
                </div>
              </t.SideTask>
            </t.TaskArea>
          </t.DetailArea>
        </t.TaskTotal>
      )}
    </>
  );
}

const TaskTitle = styled.div`
  max-height: 100px;
  width: 100%;
  font-size: 2.5rem;
  padding: 1rem 0;
  overflow: auto;
`;

const TaskDetails = styled.div`
  font-size: 1.3rem;
  line-height: 1.5;
  height: 650px;
  border: 1px solid #dad7cd;
  padding: 0 1rem;
  overflow: auto;
  border-radius: 0.2rem;
`;

const Text = styled.div`
  overflow: hidden;
`;

const TaskInfo = styled.div`
  display: inline-block;
  background-color: #ebebeb;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
`;

const TaskInfos = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 5px 0 5px;
`;
