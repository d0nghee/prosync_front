import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { patchApi, postApi, postFileApi } from '../../util/api';

// TODO: 폼에 이미지 입력 받을 수 있게 하기
export default function ProjectForm({ project = {}, method }) {
  const [img, setImg] = useState('default Image');
  const [projectData, setProjectData] = useState({
    title: project.title || '',
    intro: project.intro || '',
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    isPublic: project.isPublic || true,
    projectImage: project.projectImage,
  });

  async function ProjectHandler() {
    console.log('image', img);
    try {
      let response;
      if (method === 'POST') {
        const imgData = postFileApi('/files', img);
        console.log(imgData);
        setProjectData({ projectImage: imgData.path });
        await postApi('/projects', projectData);
      } else if (method === 'PATCH' && project.projectId) {
        response = await patchApi(
          `/projects/${project.projectId}`,
          projectData
        );
      }

      if (response.status === 200 || response.status === 201) {
        console.log('success:', projectData);
        navigate('/');
      }
    } catch (error) {
      console.error('요청 실패:', projectData);
    }
  }

  // 취소 버튼
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate('..');
  };

  // 입력 값 변경시 호출 되는 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'isPublic') {
      setProjectData((Data) => ({
        ...Data,
        [name]: value === '1' ? true : false,
      }));
    } else {
      setProjectData((Data) => ({ ...Data, [name]: value }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImg(file);
  };

  return (
    <ProjectContainer>
      <Label>프로젝트명</Label>
      <Input
        type="text"
        name="title"
        value={projectData.title}
        onChange={handleInputChange}
      />

      <Label>프로젝트 기간</Label>
      <DateContainer>
        <Input
          type="date"
          name="startDate"
          value={projectData.startDate}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="endDate"
          value={projectData.endDate}
          onChange={handleInputChange}
        />
      </DateContainer>

      <Label>프로젝트 소개</Label>
      <TextArea
        name="intro"
        value={projectData.intro}
        onChange={handleInputChange}
      />
      <Label>프로젝트 이미지</Label>
      <Input type="file" onChange={handleImageChange} />

      <CheckboxContainer>
        <Label>
          <Radio
            name="isPublic"
            value="1"
            checked={projectData.isPublic}
            onChange={handleInputChange}
          />
          Public
        </Label>
        <Label>
          <Radio
            name="isPublic"
            value="0"
            checked={!projectData.isPublic}
            onChange={handleInputChange}
          />
          Private
        </Label>
      </CheckboxContainer>
      <Button onClick={ProjectHandler}>생성</Button>
      <Button $cancel onClick={cancelHandler}>
        취소
      </Button>
    </ProjectContainer>
  );
}

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  background-color: ${(props) => (props.$cancel ? '#fff' : '#5B67CA')};
  color: ${(props) => (props.$cancel ? '#5B67CA' : '#fff')};
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  margin-right: 5px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${(props) => (props.$cancel ? '#f0f0f0' : '#0056b3')};
    border-color: #5b67ca;
  }
`;

const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;
