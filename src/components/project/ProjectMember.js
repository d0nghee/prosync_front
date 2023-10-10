import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Member from './Member';
import { deleteApi } from '../../util/api';

export default function ProjectMember({ setInView, members }) {
  const { ref, inView } = useInView({ threshold: 0 });
  const [checkMembers, setCheckMembers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [updateMembers, setUpdateMembers] = useState(members);

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

  useEffect(() => {
    setInView(inView);
  }, [inView, setInView]);

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

  return (
    <Container>
      <div>
        <input type="checkbox" onClick={allcheckHandler}></input>
        <button onClick={deleteMemberHandler}>삭제</button>
      </div>
      <MembersContainer>
        {updateMembers && updateMembers.length > 0 ? (
          updateMembers
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
        <div ref={ref}></div>
      </MembersContainer>
    </Container>
  );
}

// 나머지 스타일 부분은 그대로 유지

const Container = styled.div`
  height: 100px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
