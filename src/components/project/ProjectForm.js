import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  deleteApi,
  getFileApi,
  patchApi,
  postApi,
  postFileApi,
} from '../../util/api';

export default function ProjectForm({ project = {}, method }) {
  const [img, setImg] = useState('');
  const [projectData, setProjectData] = useState({
    title: project.title || '',
    intro: project.intro || '',
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    isPublic: project.isPublic || true,
    projectImage: project.projectImage,
    fileId: project.fileId,
  });
  const navigate = useNavigate();
  const [imgName, setImgName] = useState();
  const [newImg, setNewImg] = useState();

  useEffect(() => {
    if (method === 'PATCH') {
      console.log('patch useEffect');
      setImgData();
    }
  }, []);

  // PATCH
  // 기존 이미지 파일 이름 설정
  async function setImgData() {
    if (
      project.projectImage ===
      'https://prosync-image.s3.ap-northeast-2.amazonaws.com/basic_project_image.jpg'
    )
      return;
    const response = await getFileApi(project.projectId, 'PROJECT');
    console.log(response);

    if (response.length > 0) {
      setImgName(response[response.length - 1].fileName);
      setImg(project.projectImage);
      console.log('projectImage', project.projectImage);
    } else return;
  }

  async function ProjectHandler() {
    // 프로젝트 생성
    if (method === 'POST') {
      //이미지 없을때 생성
      if (img === null || img === '') {
        const project = await postApi('/projects', projectData);
        const projectId = await project.data.projectId;
        navigate(`/projects/${projectId}`);
        return;
      }
      // 이미지 있을때 생성
      else {
        const imgData = await postFileApi(img);
        console.log('post imgData', imgData);
        const data = {
          ...projectData,
          fileId: imgData[0].fileId,
        };

        const project = await postApi('/projects', data);
        const projectId = await project.data.projectId;
        navigate(`/projects/${projectId}`);
      }

      // 프로젝트 수정
    } else if (method === 'PATCH' && project.projectId) {
      // 이미지 지울고 수정
      if (img === null || img === '') {
        const updateData = {
          ...projectData,
          projectImage: null,
        };
        await patchApi(`/projects/${project.projectId}`, updateData).then(
          () => {
            navigate(`/projects/${project.projectId}`);
          }
        );
        return;
        // 이미지 변경후 수정
      } else {
        const imgData = await postFileApi(img);
        console.log('imgData', imgData);
        const test = await imgData[0].fileId;

        const updateData = {
          ...projectData,
          fileId: test,
        };

        await patchApi(`/projects/${project.projectId}`, updateData).then(
          () => {
            navigate(`/projects/${project.projectId}`);
            console.log('imgData', imgData);
          }
        );
      }
    }
  }

  // 취소 버튼
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

  // 이미지 등록
  const handleImageChange = (event) => {
    const file = event.target.files;
    if (file.length > 1) {
      alert('한건만 선택하세요.');
      setImg();
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewImg(reader.result); // 이미지 데이터를 상태에 저장
    };

    reader.readAsDataURL(file[0]);
    setImg(file);
    setImgName(file[0].name);
    console.log('fileName', file[0].name);
  };

  // 프로젝트 삭제
  const deleteProjectHandler = async () => {
    await deleteApi(`/projects/${project.projectId}`);
    navigate('/projects');
  };

  const imgClickHandler = () => {
    window.open(project.projectImage);
  };

  const handleImageDelete = () => {
    setImg(null);
    setImgName(null);
  };

  return (
    <ProjectContainer>
      <MainContentContainer>
        <Label>프로젝트명</Label>
        <Input
          type="text"
          name="title"
          value={projectData.title}
          onChange={handleInputChange}
        />
        <Label>프로젝트 소개</Label>
        {newImg ? <SelectedImage src={newImg} /> : <SelectedImage src={img} />}
        <TextArea
          name="intro"
          value={projectData.intro}
          onChange={handleInputChange}
        />
      </MainContentContainer>

      <SideContentContainer>
        <ButtonContainer>
          <Button onClick={ProjectHandler}>
            {method === 'PATCH' ? '수정' : '생성'}
          </Button>
          <Button $cancel onClick={cancelHandler}>
            취소
          </Button>
          {method === 'PATHCH' ? (
            <Button $cancel onClick={deleteProjectHandler}>
              프로젝트 삭제
            </Button>
          ) : null}
        </ButtonContainer>

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

        <Label>프로젝트 이미지</Label>
        <ImageInfoContainer>
          <label onClick={imgClickHandler}>
            {method === 'PATCH' && imgName}
          </label>
          {imgName && (
            <DeleteImageButton onClick={handleImageDelete}>
              ❌
            </DeleteImageButton>
          )}
        </ImageInfoContainer>
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
      </SideContentContainer>
    </ProjectContainer>
  );
}

// 스타일 컴포넌트
const ImageInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const DeleteImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #e74c3c;
  padding: 0;
  margin: 0;
  line-height: 1;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  width: 70%;
  padding: 20px;
  height: 800px;
  gap: 40px; // 메인과 사이드 간의 간격 조절
`;
const SelectedImage = styled.img`
  max-width: 50%; // 이미지의 최대 너비를 컨테이너 너비로 제한
  height: auto; // 원본 이미지의 비율을 유지
  margin-bottom: 15px; // 다른 요소와의 간격 조절
`;

const MainContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SideContentContainer = styled.div`
  flex-basis: 250px; // 또는 원하는 너비로 설정
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between; // 사이드 컨텐츠의 상단과 하단 내용을 분리
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: auto; // 버튼을 사이드 컨테이너의 하단으로 이동
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
