import { useEffect, useState } from 'react';
import ProjectMember from '../../components/project/ProjectMember';
import ProjectMemberSearchBar from '../../components/project/ProjectMemberSearchBar';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { getApi } from '../../util/api';
import styled from 'styled-components';
import { tryFunc } from '../../util/tryFunc';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getCookie } from '../../util/cookies';
import { debounce } from '../../util/debounce';

export default function EditProjectMember() {
  const data = useRouteLoaderData('editmember');
  const [members, setMembers] = useState(data.data.data);
  const { projectId } = useParams();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // admin인지 체크
  useEffect(() => {
    setIsLoading(true);
    const memberId = getCookie('memberId');
    console.log('memberID', memberId);
    if (members) {
      const adminId = members.find(
        (member) => member.authority === 'ADMIN'
      ).memberId;

      if (adminId !== memberId) {
        alert('접근 권한이 없습니다');
        navigate('..');
      }
    }
  }, []);

  // 서치바 value 값 변화시 호출
  const handleInputChange = (input) => {
    console.log(input, 'input');
    setSearch(input);

    console.log('디바운스 서치');
  };

  useEffect(() => {
    const getMemberHandler = () => {
      if (search === null || search === '') {
        setMembers([]);
      }
      const getMembers = async () => {
        const response = await getApi(
          `/projects/${projectId}/members?size=100&search=${search}`
        );
        return response;
      };

      const getMembersSuccess = (response) => {
        setIsLoading(false);

        setMembers(response.data.data);
      };

      tryFunc(
        getMembers,
        (response) => getMembersSuccess(response),
        dispatch
      )();
    };

    getMemberHandler();
  }, [search]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
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
  margin-bottom: 6rem;
`;

const SearchBarContainer = styled.div`
  margin-left: 300px;
  margin-right: 300px;
  margin-bottom: 30px;
`;
