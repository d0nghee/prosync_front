import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Member from './Member';
import { deleteApi, postApi } from '../../util/api';
import InviteModal from './InviteModal';

export default function ProjectMember({ members, projectId }) {
  const [checkMembers, setCheckMembers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [updateMembers, setUpdateMembers] = useState(members);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    const initialCheckStatus = members
      ? members
          .filter(
            (member) => member.authority !== 'ADMIN' && member.status !== 'QUIT'
          )
          .reduce((acc, member) => {
            acc[member.memberProjectId] = false;
            return acc;
          }, {})
      : {};
    setCheckMembers(initialCheckStatus);
  }, [updateMembers, members]);

  const allcheckHandler = () => {
    const newStatus = Object.keys(checkMembers).reduce((acc, key) => {
      acc[key] = !isChecked;
      return acc;
    }, {});
    setIsChecked((pre) => !pre);

    setCheckMembers(newStatus);
  };

  const handleCheckboxChange = (memberProjectId) => {
    setCheckMembers((prev) => ({
      ...prev,
      [memberProjectId]: !prev[memberProjectId],
    }));
  };

  // 멤버 삭제
  const deleteMemberHandler = async () => {
    const isConfirmed = window.confirm(
      '선택된 멤버를 정말로 삭제하시겠습니까?'
    );

    if (!isConfirmed) return;

    const checkedMemberProjectIds = Object.keys(checkMembers).filter(
      (memberProjectId) => checkMembers[memberProjectId]
    );

    // 각 memberProjectId에 대한 삭제 요청 생성
    const deleteRequests = checkedMemberProjectIds.map((memberProjectId) =>
      deleteApi(`/project-members/${memberProjectId}`)
    );
    await Promise.all(deleteRequests);
    const updatedMembers = members.filter(
      (member) => !checkedMemberProjectIds.includes(member.memberProjectId)
    );
    setUpdateMembers(updatedMembers);
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
      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inviteLink={inviteLink}
      />
      <MenuContainer>
        <input type="checkbox" onClick={allcheckHandler}></input>
        <div>
          <StyledButton onClick={handleInvite}>초대 링크 생성</StyledButton>

          <StyledButton onClick={deleteMemberHandler}>삭제</StyledButton>
        </div>
      </MenuContainer>
      <MembersContainer>
        {members && members.length > 0 ? (
          members
            .filter(
              (member) =>
                member.authority !== 'ADMIN' && member.status !== 'QUIT'
            )
            .map((member, index) => (
              <Member
                key={index}
                member={member}
                isChecked={checkMembers[member.memberProjectId]}
                onCheckboxChange={() =>
                  handleCheckboxChange(member.memberProjectId)
                }
              />
            ))
        ) : (
          <NoMembers>멤버가 없습니다</NoMembers>
        )}
      </MembersContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 800px;
  padding: 20px;

  background-color: #fff;
`;

const MembersContainer = styled.div`
  margin-top: 40px;
  height: 800px;
  margin-left: 300px;
  margin-right: 300px;
  overflow: scroll;
`;

const NoMembers = styled.div`
  color: #888;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 이 부분을 추가
  margin-left: 300px;
  margin-right: 300px;
  background: #f5f6f9;
  padding: 20px;
  background: #f8f9f6;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  background-color: #6672fb;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5b67ca;
  }

  &:first-child {
    margin-left: 0;
  }
`;
