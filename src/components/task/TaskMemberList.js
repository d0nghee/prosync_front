import React from "react";
import { styled } from "styled-components";
import ProfileCard from "../common/ProfileCard";

export default function TaskMemberList({ taskMembers, isCheckList }) {
  return (
    <>
      <MemberBoxes>
        {taskMembers &&
          taskMembers.map((member) => (
            <div key={member.memberProjectId}>
              {isCheckList && <input type="checkbox" />}
              <ProfileCard
                id={member.memberProjectId}
                name={member.name}
                image={member.profileImage}
              />
            </div>
          ))}
      </MemberBoxes>
    </>
  );
}

const MemberBoxes = styled.div`
  max-height: 500px;
  max-width: 200px;
  border: 1px solid #dad7cd;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: auto;
  padding: 1.5rem;

  & > div {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3d5ca;
    width: 100%;
    display: flex;
  }

  & > div:last-child {
    margin-bottom: 0;
    border: none;
    padding-bottom: 0;
  }
`;
