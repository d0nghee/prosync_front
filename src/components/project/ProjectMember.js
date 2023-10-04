import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Member from './Member';

export default function ProjectMember({ members, setInView }) {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    setInView(inView);
  }, [inView, setInView]);

  return (
    <div style={containerStyle}>
      <div style={membersContainerStyle}>
        {members && members.length > 0 ? (
          members
            .filter(
              (member) =>
                member.authority !== 'ADMIN' && member.status !== 'QUIT'
            )
            .map((member, index) => <Member key={index} member={member} />)
        ) : (
          <div style={noMembersStyle}>멤버가 없습니다</div>
        )}
      </div>

      <div ref={ref}>여기 보이면 다음 데이터</div>
    </div>
  );
}
const containerStyle = {
  // position: 'relative', // submit 버튼을 절대 위치로 배치하기 위해
  height: '100px',
  padding: '20px',
  border: '1px solid #e1e1e1',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const membersContainerStyle = {
  marginTop: '40px', // submit 버튼과의 간격
};

const noMembersStyle = {
  color: '#888',
  fontStyle: 'italic',
};
