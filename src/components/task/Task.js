import { useSubmit, Link, useNavigate } from "react-router-dom";
import * as t from "./TaskForm.style";
import TaskStatus from "./TaskStatus";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { getApi } from "../../util/api";

export default function Task({ task, taskMembers }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const taskDeleteHandler = () => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      submit(null, { method: "DELETE", name: "task-delete" });
    }
  };

  const [assignees, setAssignees] = useState();
  useEffect(() => {
    (async () => {
      const response = await getApi(`members`);
      const members = await response.data.data;
      setAssignees(members);
    })();
  }, []);

  return (
    <>
      <DetailArea>
        <BackButton type="button" onClick={() => navigate("..")}>
          BACK
        </BackButton>
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
            <div>
              <Link to="edit">수정</Link>
              <button onClick={taskDeleteHandler}>삭제</button>
            </div>
          </t.MainTask>
          <t.SideTask>
            <div>
              {/* TODO: 업무 담당자 조회 추가 */}
              <t.SideName>Assignees</t.SideName>
              <div>test</div>
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
const BackButton = styled.button`
  background-color: #d9d9d9;
  border: none;
  padding: 1rem;
  position: sticky;
  font-size: 1rem;
  border-radius: 5px;
  color: #555;
  font-weight: bold;
  width: 80px;
`;

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
