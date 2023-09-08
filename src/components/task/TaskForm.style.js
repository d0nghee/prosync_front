import { styled } from "styled-components";
import ReactQuill from "react-quill";

export const MarkdownInput = styled(ReactQuill)`
  .ql-editor {
    font-size: 1.2rem;
    line-height: 1.5;
    height: 500px;

    a {
      text-decoration: underline;
    }
  }
`;

export const TaskTitle = styled.input`
  height: 50px;
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
`;

export const DateInput = styled.input`
  height: 40px;
  width: 120px;
  padding: 1rem;
  font-size: 1rem;
`;

export const Period = styled.div`
  display: flex;
`;

export const MainTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    width: 800px;
  }
`;

export const SideTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SideInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 1rem;
  font-size: 1rem;
`;

export const TaskArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  width: 1200px;
  margin: 20px 0;
`;

export const SideName = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
`;

export const Container = styled.div`
  position: relative;
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  top: 83px;
  left: 0;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const TaskStatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    flex: 2;
  }
`;

export const ChooseStatusComment = styled.div`
  height: 50px;
  font-size: 18x;
  min-width: 100px;
  text-align: center;
  line-height: 50px;
  max-width: 150px;
`;
