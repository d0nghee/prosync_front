import React from "react";
import { styled } from "styled-components";
import ProfileCard from "../common/ProfileCard";

export default function TaskMemberList({ taskMembers }) {
  return (
    <MemberBoxes>
      {taskMembers &&
        taskMembers.map((member) => (
          <ProfileCard
            key={member.memberProjectId}
            id={member.memberProjectId}
            name={member.name}
            image={member.profileImage}
          />
        ))}
    </MemberBoxes>
  );
}

const MemberBoxes = styled.div`
  max-height: 500px;
  border: 1px solid #dad7cd;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  background-color: white;
  overflow: auto;
`;
