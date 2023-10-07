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
    font-size: 1.3rem;
    line-height: 1.5;
    height: 650px;
    border: ${({ isError }) => (isError ? "3px solid #ff8fab" : "none")};

    a {
      text-decoration: underline;
    }
  }
`;

export const TaskTitle = styled.input`
  max-height: 100px;
  width: 100%;
  font-size: 2.5rem;
  padding: 1rem 1.5rem 1rem 0rem;
  border: none;
  border-bottom: ${({ isError }) => (isError ? "3px solid #ff8fab" : "none")};
  outline: none;
  margin: 0.2rem 1rem 0.2rem 0;
  padding: 1rem 0;
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
  border: ${({ isError }) => (isError ? "3px solid #ff8fab" : "none")};
  outline: none;
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
  display: flex;
  align-items: center;
  gap: 0.2rem;
  height: 2rem;

  .logo:hover {
    cursor: pointer;
    background-color: #d9d9d9;
    border-radius: 10px;
  }
`;

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${({ customtop }) => customtop || "0px"};
  display: ${(props) => (props.show ? "block" : "none")};
  height: 500px;
  width: 300px;
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
  margin-bottom: 1rem;
`;

export const Modal = styled.dialog`
  border: 1px solid black;
`;

export const TaskTotal = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  & > div {
    width: 1600px;
    margin: 0 auto;
  }
`;

export const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
`;

export const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dad7cd;
`;

export const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: bold;
`;

export const StyledFileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const StyledButton = styled.button`
  background-color: #4361ee;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

export const ErrorMessage = styled.div`
  background-color: #ff8fab;
  padding: 0.5rem;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s;

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;
