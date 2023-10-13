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
import { getCookie } from '../../util/cookies';

export default function EditProjectMember() {
  const data = useRouteLoaderData('editmember');
  const [members, setMembers] = useState(data.data.data);
  const { projectId } = useParams();
  const [search, setSearch] = useState('');
  const authorityState = useSelector(selectMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const memberId = getCookie('memberId');
    console.log('memberID', memberId);
    if (members) {
      console.log(members, 'members');
      const adminId = members.find(
        (member) => member.authority === 'ADMIN'
      ).memberId;
      console.log(adminId, 'admin');

      if (adminId !== memberId) {
        alert('접근 권한이 없습니다');
        navigate('..');
      }
    }
  }, []);

  const handleInputChange = (input) => {
    console.log('handleInputChange');
    setSearch(input);
  };

  useEffect(() => {
    getMemberHandler();
  }, [search]);

  const getMemberHandler = async () => {
    if (search === null || search === '') {
      setMembers([]);
    }
    const getMembers = async () => {
      setIsLoading(true);
      const response = await getApi(
        `/projects/${projectId}/members?size=100&search=${search}`
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
    setIsLoading(true);
    const patchMemberAuthority = authorityState.map((item) => {
      return patchApi(`/project-members/${item.memberProjectId}`, {
        authority: item.authority,
      });
    });

    Promise.all(patchMemberAuthority).then(() => {
      setMembers((prevMembers) => [...prevMembers]);
      navigate(`/projects/${projectId}`);
    });
    setIsLoading(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <SubmitButton onClick={submitHandler}>저장</SubmitButton>
      <SearchBarContainer>
        <ProjectMemberSearchBar onSearch={handleInputChange} />
      </SearchBarContainer>
      <ProjectMember members={members} projectId={projectId} />
    </Container>
  );
}

export async function loader({ params }) {
  const projectId = params.projectId;
  try {
    const data = await getApi(`/projects/${projectId}/members`);
    return data;
  } catch (error) {
    console.log(error);
    if (error === undefined) {
      console.error('An undefined error occured!');
      alert('알 수 없는 오류가 발생했습니다.');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('네트워크 에러 발생:', error);
      alert(
        '서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요.'
      );
    } else if (error.response && error.response.status === 401) {
      alert('접근 권한이 없습니다');
      window.location.href = '/';
    }
  }
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
const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
