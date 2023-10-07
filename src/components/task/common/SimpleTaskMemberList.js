import { useState } from "react";
import { styled } from "styled-components";
import TaskMemberList from "./TaskMemberList";
import * as t from "../form/TaskForm.style";

export default function SimpleTaskMemberList({ taskMembers }) {
  const [showTaskList, setShowTaskList] = useState(false);

  return (
    <>
      <SimpleBox>
        <Images>
          {taskMembers.map((member, idx) =>
            idx < 4 ? (
              <UserBox key={member.memberProjectId}>
                <UserName>{member.name}</UserName>
                <ProfileImage src={member.profileImage} />
              </UserBox>
            ) : (
              ""
            )
          )}
        </Images>
        {taskMembers.length >= 5 ? (
          <AddBedge onClick={() => setShowTaskList((prv) => !prv)}>
            {showTaskList ? `접기` : `+ ${taskMembers.length - 4}`}
          </AddBedge>
        ) : (
          ""
        )}
        {showTaskList && (
          <>
            <t.BackDrop onClick={() => setShowTaskList(false)} />
            <Wrapper show="true" customtop="60px">
              <TaskMemberList taskMembers={taskMembers} />
            </Wrapper>
          </>
        )}
      </SimpleBox>
    </>
  );
}

const SimpleBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${({ customtop }) => customtop || "0px"};
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Images = styled.div`
  display: flex;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: abs;

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

const AddBedge = styled.div`
  background-color: #9f86c0;
  color: white;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
`;
