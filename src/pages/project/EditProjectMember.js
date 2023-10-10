import { useEffect, useState } from 'react';
import ProjectMember from '../../components/project/ProjectMember';
import ProjectMemberSearchBar from '../../components/project/ProjectMemberSearchBar';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { deleteApi, getApi, patchApi, postApi } from '../../util/api';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMembers } from '../../redux/reducers/member/memberAuthoritySlice';
import { useDispatch } from 'react-redux';
import InviteModal from '../../components/project/InviteModal';

export default function EditProjectMember() {
  const data = useRouteLoaderData('editmember');
  const [members, setMembers] = useState(data.data.data);
  const { projectId } = useParams();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(2);
  const [maxPage, setMaxPage] = useState(data.data.pageInfo.totalPages);
  const [inView, setInView] = useState(false);
  const authorityState = useSelector(selectMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inviteLink, setInviteLink] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (input) => {
    console.log('handleInputChange');
    setMembers([]);
    setMaxPage(1);
    setSearch(input);
    setPage(1);
  };

  useEffect(() => {
    console.log('무한 츠쿠요미');
    if (!inView || page > maxPage) return;

    loadMore();
  }, [inView, search, maxPage, page]);

  const loadMore = async () => {
    console.log('loadmore 진입');
    const response = await getApi(
      `/projects/${projectId}/members?size=2&page=${page}&search=${search}`
    );

    const newMembers = response.data.data;

    const totalPages = response.data.pageInfo.totalPages;

    setMaxPage(totalPages);

    if (page === 1) {
      setMembers(newMembers);
    } else {
      setMembers((prev) => [...prev, ...newMembers]);
    }

    setPage((pre) => pre + 1);
  };

  // useEffect(() => {
  //   console.log('members', members);
  //   if (Array.isArray(members) && members.length > 0) {
  //     const memberProjectIds = members
  //       .filter(
  //         (member) => member.authority !== 'ADMIN' && member.status !== 'QUIT'
  //       )
  //       .map((member) => member.memberProjectId);

  //     dispatch(addCheckbox(memberProjectIds));
  //   }
  // }, [members, dispatch]);

  const submitHandler = () => {
    console.log('submitHandler');
    console.log('authorityState:', authorityState);

    const patchMemberAuthority = authorityState.map((item) => {
      return patchApi(`/project-members/${item.memberProjectId}`, {
        authority: item.authority,
      });
    });

    Promise.all(patchMemberAuthority).then((response) => {
      console.log('All patch requests were successful', response);
      setMembers((prevMembers) => [...prevMembers]);
    });
  };

  const handleInvite = async () => {
    const response = await postApi(`/projects/${projectId}/invitation`);
    const inviteCode = response.data.data.inviteCode;
    console.log(response);

    setInviteLink(`http://localhost:3000/projects/invite/${inviteCode}`);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <button onClick={handleInvite}>초대 링크 생성</button>
      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inviteLink={inviteLink}
      />
      <SubmitButton onClick={submitHandler}>저장</SubmitButton>
      <ProjectMemberSearchBar onSearch={handleInputChange} />
      <ProjectMember members={members} setInView={setInView} />
    </Container>
  );
}

export async function loader({ params }) {
  console.log('loader 호출');
  const projectId = params.projectId;
  const data = getApi(`/projects/${projectId}/members`);

  return data;
}

export const Container = styled.div`
  /* position: relative; */
`;

const SubmitButton = styled.button`
  top: 20px;
  right: 20px;
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
