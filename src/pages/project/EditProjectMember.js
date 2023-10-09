import { useEffect, useState } from 'react';
import ProjectMember from '../../components/project/ProjectMember';
import ProjectMemberSearchBar from '../../components/project/ProjectMemberSearchBar';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { deleteApi, getApi, patchApi, postApi } from '../../util/api';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  addCheckbox,
  selectCheckbox,
  toggleAllItems,
} from '../../redux/reducers/member/memberCheckboxSlice';
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
  const checkboxState = useSelector(selectCheckbox);
  const authorityState = useSelector(selectMembers);
  const isChecked = checkboxState.checkbox[0]?.checked || false;
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
    if (!inView || page > maxPage) return;

    loadMore();
  }, [inView, search, maxPage, page]);

  const loadMore = async () => {
    console.log('loadmore 진입');
    const response = await getApi(
      `/projects/${projectId}/members?page=${page}&search=${search}`
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

  useEffect(() => {
    if (Array.isArray(members) && members.length > 0) {
      const memberProjectIds = members
        .filter(
          (member) => member.authority !== 'ADMIN' && member.status !== 'QUIT'
        )
        .map((member) => member.memberProjectId);

      dispatch(addCheckbox(memberProjectIds));
    }
  }, [members, dispatch]);

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

  const deleteMemberHandler = () => {
    // 체크박스가 true로 설정된 memberProjectId들만 추출
    const checkedIds = Object.keys(checkboxState.checkbox).filter(
      (id) => id !== '0' && checkboxState.checkbox[id].checked
    );

    const deleteMemberRequest = checkedIds.map((memberProjectId) => {
      return deleteApi(`/project-members/${memberProjectId}`);
    });

    Promise.all(deleteMemberRequest).then(() => {
      const updatedMembers = members.filter(
        (member) => !checkedIds.includes(member.memberProjectId.toString())
      );
      setMembers(updatedMembers);
    });
  };

  const handleMemberCheck = () => {
    dispatch(toggleAllItems());
  };
  const handleInvite = async () => {
    const response = await postApi(`/projects/${projectId}/invitation`);
    const inviteCode = response.data.data.inviteCode;
    setInviteLink(`http://localhost:8080/api/v1/invitation/${inviteCode}`);
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
      <CheckboxContainer>
        <HiddenCheckbox checked={isChecked} onChange={handleMemberCheck} />
        <StyledCheckbox checked={isChecked} />
      </CheckboxContainer>
      <DeleteButton onClick={deleteMemberHandler}>삭제</DeleteButton>
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
  position: relative;
`;

const SubmitButton = styled.button`
  position: absolute;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 20px;
  right: 100px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;
const CheckboxContainer = styled.div`
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? '#5B67CA' : '#E0E0E0')};
  border-radius: 4px;
  transition: all 150ms;
  cursor: pointer;
`;
