import { styled } from "styled-components";
import ReactQuill from "react-quill";

export const TaskContents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
`;

export const MarkdownInput = styled(ReactQuill)`
  .ql-editor {
    font-size: 1.05rem;
    line-height: 1.5;
    height: 650px;

    a {
      text-decoration: underline;
    }
  }
`;

export const TaskTitle = styled.input`
  max-height: 100px;
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
  width: 70%;
`;

export const SideTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 280px;

  & > div {
    border-bottom: 1px solid #dad7cd;
    padding-bottom: 1rem;
  }
`;

export const SideInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: 1rem;
  border: none;
`;

export const TaskArea = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  justify-content: space-between;
`;

export const SideName = styled.div`
  margin-bottom: 1.2rem;
  font-weight: bold;
`;

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${(props) => props.top};
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
  font-size: 0.8rem;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

export const Modal = styled.dialog`
  border: 1px solid black;
`;

export const TaskTotal = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  & > div {
    width: 1400px;
    margin: 0 auto;
  }
`;
