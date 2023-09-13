import { useSubmit, useNavigate } from "react-router-dom";
import * as t from "./TaskForm.style";
import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";
import TaskMemberList from "./TaskMemberList";
import SimpleTaskMemberList from "./SimpleTaskMemberList";
import NaviButton from "../common/Button";

export default function Task({ task, taskMembers }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const taskDeleteHandler = () => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      submit(null, { method: "DELETE", name: "task-delete" });
    }
  };

  return (
    <>
      <DetailArea>
        <NaviButton name="목록" type="button" onClick={() => navigate("..")} />
        <t.TaskArea>
          <t.MainTask>
            <TaskTitle>{task.title}</TaskTitle>
            <div>{task.createdAt}</div>
            <div>
              <h2>Details</h2>
              <TaskDetails
                dangerouslySetInnerHTML={{ __html: `${task.detail}` }}
              />
            </div>
            <ButtonArea>
              <NaviButton
                type="button"
                name="수정"
                color="#3a86ff"
                fontColor="white"
                to="edit"
                onClick={() => navigate("edit")}
              />
              <NaviButton
                type="submit"
                name="삭제"
                onClick={taskDeleteHandler}
              />
            </ButtonArea>
          </t.MainTask>
          <t.SideTask>
            <div>
              <t.SideName>Assignees</t.SideName>
              {taskMembers.length > 0 ? (
                <SimpleTaskMemberList taskMembers={taskMembers} />
              ) : (
                // <TaskMemberList taskMembers={taskMembers} />
                <div>지정된 담당자가 없습니다.</div>
              )}
            </div>
            <div>
              <t.SideName>Classification</t.SideName>
              <Text>{task.classification}</Text>
            </div>
            <div>
              <t.SideName>Task Period</t.SideName>
              <div>
                {task.startDate} - {task.endDate}
              </div>
            </div>
            <div>
              <t.SideName>Task Status</t.SideName>
              <t.TaskStatusBox>
                <TaskStatus
                  color={task.color}
                  name={task.taskStatus}
                  width="100px"
                />
              </t.TaskStatusBox>
            </div>
          </t.SideTask>
        </t.TaskArea>
      </DetailArea>
    </>
  );
}

const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
`;

const TaskTitle = styled.h2`
  max-height: 100px;
  width: 800px;
  font-size: 1.2rem;
  border-bottom: 1px solid #dad7cd;
  padding: 1rem 0.2rem;
  overflow: auto;
`;

const TaskDetails = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  height: 500px;
  border: 1px solid #dad7cd;
  padding: 0 1rem;
  overflow: auto;
  border-radius: 0.2rem;
`;

const Text = styled.div`
  overflow: hidden;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 0.7rem;
`;
