import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { deleteTaskMember, postTaskMember } from "../../util/api";
import ProfileCard from "../common/ProfileCard";

export default function TaskMemberList({
  taskMembers,
  isCheckList,
  assignedMembers,
  toggleList,
}) {
  //TODO: 업무 담당자 부모에서 함수 받아서 업데이트
  const [members, setMembers] = useState(taskMembers);
  const [checkedMemberIds, setCheckedMemberIds] = useState([]);
  const params = useParams();

  const checkMemberHandler = (memberProjectId) => {
    const findId = checkedMemberIds.filter((id) => id === memberProjectId);
    findId.length !== 0
      ? setCheckedMemberIds([
          ...checkedMemberIds.filter((id) => id !== memberProjectId),
        ])
      : setCheckedMemberIds([...checkedMemberIds, memberProjectId]);
  };

  const updateTaskMemberHandler = () => {
    toggleList();
    const assignedIds = assignedMembers.map((one) => one.memberProjectId);
    const deleteIds = checkedMemberIds.filter((newId) =>
      assignedIds.includes(newId)
    );
    const addIds = checkedMemberIds.filter(
      (newId) => !assignedIds.includes(newId)
    );
    (async () => {
      const taskId = params.taskId;
      if (deleteIds.length !== 0) {
        await deleteTaskMember(taskId, { projectMemberIds: deleteIds });
      } else if (addIds.length !== 0) {
        await postTaskMember(taskId, { projectMemberIds: addIds });
      }
    })();
  };
  return (
    <>
      <MemberBoxes>
        {members &&
          members.map((member) => (
            <div key={member.memberProjectId}>
              {isCheckList && (
                <input
                  type="checkbox"
                  onChange={() => checkMemberHandler(member.memberProjectId)}
                />
              )}
              <ProfileCard
                id={member.memberProjectId}
                name={member.name}
                image={member.profileImage}
              />
            </div>
          ))}
        {isCheckList && (
          <ButtonArea>
            <Button
              type="button"
              onClick={updateTaskMemberHandler}
              color="#d6ccc2"
            >
              등록
            </Button>
            <Button type="button" onClick={toggleList} border="#d6ccc2">
              취소
            </Button>
          </ButtonArea>
        )}
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

  & > div > input[type="checkbox"] {
    margin-right: 10px;
    width: 13px;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 10px;
  width: 100%;
  background-color: ${(props) => props.color || "white"};
  border-radius: 20px;
  border: ${(props) => (props.border ? props.border + " 1px solid" : "none")};
  color: ${(props) => props.fontcolor || "#333"};
`;
