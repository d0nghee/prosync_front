import { useSubmit, Link } from "react-router-dom";

export default function Task({ task }) {
  //TODO: useSubmit으로 삭제 요청
  const submit = useSubmit();
  const taskDeleteHandler = () => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      submit(null, null);
    }
  };

  return (
    <div>
      <h2>{task.title}</h2>
      <div>
        {task.startDate} - {task.endDate}
      </div>
      <div>{task.classification}</div>
      <div>{task.taskStatus}</div>
      <div>{task.createdAt}</div>
      <menu>
        <Link to="edit">수정</Link>
        <button onClick={taskDeleteHandler}>삭제</button>
      </menu>
    </div>
  );
}
