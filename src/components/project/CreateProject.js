import styled from 'styled-components';

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid #5b67ca;
  flex: 1;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid #5b67ca;
  height: 300px;
  rows: 4;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Radio = styled.input.attrs({ type: 'radio' })`
  margin-right: 5px;

  &:checked {
    background-color: #5b67ca;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: ${(props) => (props.cancel ? '#fff' : '#5B67CA')};
  color: ${(props) => (props.cancel ? '#5B67CA' : '#fff')};
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  margin-right: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${(props) => (props.cancel ? '#f0f0f0' : '#0056b3')};
    border-color: #5b67ca;
  }
`;

const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;

function ProjectCreationComponent() {
  return (
    <ProjectContainer>
      <Label>프로젝트명</Label>
      <Input type="text" />

      <Label>프로젝트 기간</Label>
      <DateContainer>
        <Input type="date" />
        <Input type="date" />
      </DateContainer>

      <Label>프로젝트 소개</Label>
      <TextArea />

      <CheckboxContainer>
        <Label>
          <Radio name="visibility" value="public" />
          Public
        </Label>
        <Label>
          <Radio name="visibility" value="private" />
          Private
        </Label>
      </CheckboxContainer>
      <Button>생성</Button>
      <Button cancel>취소</Button>
    </ProjectContainer>
  );
}

export default ProjectCreationComponent;
