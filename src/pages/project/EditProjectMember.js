import { useEffect, useState } from 'react';
import ProjectMember from '../../components/project/ProjectMember';
import ProjectMemberSearchBar from '../../components/project/ProjectMemberSearchBar';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { getApi, patchApi } from '../../util/api';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMembers } from '../../redux/reducers/member/memberAuthoritySlice';
import { tryFunc } from '../../util/tryFunc';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function EditProjectMember() {
  const data = useRouteLoaderData('editmember');
  const [members, setMembers] = useState(data.data.data);
  const { projectId } = useParams();
  const [search, setSearch] = useState('');
  const authorityState = useSelector(selectMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (input) => {
    console.log('handleInputChange');
    setSearch(input);
  };

  useEffect(() => {
    getMemberHandler();
  }, [search]);

  const getMemberHandler = async () => {
    const getMembers = async () => {
      setIsLoading(true);

      const response = await getApi(
        `/projects/${projectId}/members?search=${search}`
      );
      return response;
    };

    const getMembersSuccess = (response) => {
      setIsLoading(false);
      setMembers(response.data.data);
    };

    tryFunc(getMembers, (response) => getMembersSuccess(response), dispatch)();
  };

  const submitHandler = () => {
    const isConfirmed = window.confirm('변경사항을 저장하시겠습니까?');

    if (!isConfirmed) return;
    const patchMemberAuthority = authorityState.map((item) => {
      return patchApi(`/project-members/${item.memberProjectId}`, {
        authority: item.authority,
      });
    });

    Promise.all(patchMemberAuthority).then(() => {
      setMembers((prevMembers) => [...prevMembers]);
      navigate(`/projects/${projectId}`);
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <SubmitButton onClick={submitHandler}>저장</SubmitButton>
      <ProjectMemberSearchBar onSearch={handleInputChange} />
      <ProjectMember members={members} projectId={projectId} />
    </Container>
  );
}

export async function loader({ params }) {
  const projectId = params.projectId;
  const data = await getApi(`/projects/${projectId}/members`, { size: 100 });
  return data;
}
const Container = styled.div`
  height: 1000px;
`;

const SubmitButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 200px;
  padding: 10px 20px;
  background-color: #6672fb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5b67ca;
  }
`;
