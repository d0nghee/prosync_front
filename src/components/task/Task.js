import { useSubmit, useNavigate } from "react-router-dom";
import * as t from "./TaskForm.style";
import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";
import SimpleTaskMemberList from "./SimpleTaskMemberList";
import NaviButton from "../common/Button";

export default function Task({ task }) {
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
                  color="#eb6424"
                  fontcolor="white"
                  onClick={taskDeleteHandler}
                />
              </t.ButtonArea>
            </t.TopNav>
            <t.TaskArea>
              <t.MainTask>
                <div>{task.data.createdAt}</div>
                <div>
                  <TaskDetails
                    dangerouslySetInnerHTML={{ __html: `${task.data.detail}` }}
                  />
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
                    {task.data.startDate} - {task.data.endDate}
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
  font-size: 1.05rem;
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
