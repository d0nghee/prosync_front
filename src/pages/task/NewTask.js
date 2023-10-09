import TaskForm from "../../components/task/form/TaskForm";
import { styled } from "styled-components";

export default function NewTask() {
  return (
    <TaskSection>
      <TaskForm method="POST" />
    </TaskSection>
  );
}

const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 70%;
`;
