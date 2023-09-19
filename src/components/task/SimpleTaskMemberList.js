import { styled } from "styled-components";

export default function SimpleTaskMemberList({ taskMembers }) {
  return (
    <SimpleBox>
      {taskMembers.map((member) => (
        <UserBox key={member.memberProjectId}>
          <UserName>{member.name}</UserName>
          <ProfileImage src={member.profileImage} />
        </UserBox>
      ))}
    </SimpleBox>
  );
}

const SimpleBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: abs
  z-index: 2;

  &:hover div {
    display: block;
  }
`;

const UserName = styled.div`
  display: none;
  position: absolute;
  background-color: #1b263b;
  padding: 10px;
  color: white;
  bottom: 55px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  display: none;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;
