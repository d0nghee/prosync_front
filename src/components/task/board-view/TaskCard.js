import SimpleTaskMemberList from "../common/SimpleTaskMemberList";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import * as tv from "../table-view/TableViewList.style";
import * as t from "../form/TaskForm.style";
import TaskMemberList from "../common/TaskMemberList";
import { useState } from "react";

export default function TaskCard({ task, dragStart }) {
  const params = useParams();
  const navigate = useNavigate();
  const [showAssignees, setShowAssignees] = useState(false);

  return (
    <Card
      key={task.taskId}
      draggable="true"
      onDragStart={(e) => dragStart(e, JSON.stringify(task))}
    >
      <h3
        onClick={() =>
          navigate(`/projects/${params.projectId}/tasks/${task.taskId}`)
        }
      >
        {task.title}
      </h3>
      <div>{`${task.startDate} - ${task.endDate}`}</div>
      {task.taskMembers.length !== 0 ? (
        <ModalSection>
          <Assignee onClick={() => setShowAssignees((prv) => !prv)}>
            <SimpleTaskMemberList
              taskMembers={task.taskMembers}
              taskId={task.taskId}
              isTable="true"
            />
          </Assignee>
          {showAssignees && (
            <div>
              <t.BackDrop onClick={() => setShowAssignees(false)} />
              <t.Wrapper show="true" customtop="300px">
                <TaskMemberList
                  taskMembers={task.taskMembers}
                  taskId={task.taskId}
                />
              </t.Wrapper>
            </div>
          )}
        </ModalSection>
      ) : (
        <Undefined>담당자 없음</Undefined>
      )}
    </Card>
  );
}

const ModalSection = styled.div``;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  height: 200px;
  cursor: grab;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    cursor: pointer;
    overflow: hidden;
    height: 20px;
  }
`;

const Assignee = styled.div`
  display: flex;
`;

const Undefined = styled.div`
  background-color: #d6ccc2;
  color: white;
  padding: 5px;
  width: 100px;
  text-align: center;
  border-radius: 1rem;
`;
