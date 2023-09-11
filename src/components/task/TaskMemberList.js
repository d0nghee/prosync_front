import React from "react";
import { styled } from "styled-components";
import ProfileCard from "../common/ProfileCard";

export default function TaskMemberList({ taskMembers }) {
  return (
    <MemberBoxes>
      <div>
        <input type="checkbox" />
      </div>
      {taskMembers &&
        taskMembers.map((member) => (
          <Item key={member.memberProjectId}>
            <div>
              <input type="checkbox" />
            </div>
            <ProfileCard
              key={member.memberProjectId}
              id={member.memberProjectId}
              name={member.name}
              image={member.profileImage}
            />
          </Item>
        ))}
    </MemberBoxes>
  );
}

const MemberBoxes = styled.div`
  max-height: 500px;
  border: 1px solid #dad7cd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  background-color: white;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;
