import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function TasksList({ tasks }) {
  return (
    <div>
      <ul>
        {tasks.data.map((task) => (
          <li key={task.taskId}>
            <Link to={task.taskId}>
              <div>
                <h2>{task.title}</h2>
                <div>
                  {task.startDate} - {task.endDate}
                </div>
                <div>{task.classification}</div>
                <div>{task.taskStatus}</div>
                <div>{task.createdAt}</div>
              </div>
            </Link>
          </li>
        ))}
        <br />
      </ul>
    </div>
  );
}
