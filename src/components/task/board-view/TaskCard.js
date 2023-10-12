import SimpleTaskMemberList from "../common/SimpleTaskMemberList";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskCard({ task, dragStart }) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
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
          <Assignee>
            <SimpleTaskMemberList
              taskMembers={task.taskMembers}
              taskId={task.taskId}
            />
          </Assignee>
        ) : (
          <Undefined>담당자 없음</Undefined>
        )}
      </Card>
    </div>
  );
}

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
