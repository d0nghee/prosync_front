import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";
import { tryFunc } from "../../../util/tryFunc";
import { deleteTaskMemberApi } from "../../../util/api";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MemberProfile from "../../common/MemberProfile";

export default function TaskMemberList({
  taskMembers, //TODO: checklist인 경우 -> project member (프로젝트 회원 redux 로)
  isCheckList,
  toggleList,
  taskId,
  updateTask,
}) {
  const dispatch = useDispatch();
  const [memberProfile, setMemberProfile] = useState({ show: false });
  const [memberId, setMemberId] = useState(null);
  const params = useParams();

  const checkedMembers = useSelector(
    (state) => state.taskMembers.checkedMembers
  );

  const memberDeleteHandler = (memberProjectId) => {
    tryFunc(
      () =>
        deleteTaskMemberApi(taskId, {
          projectMemberIds: [memberProjectId],
        }),
      () => {
        dispatch(
          taskListAction.updateBoardTaskMembers({ memberProjectId, taskId })
        );
        if (updateTask) {
          const newMembers = taskMembers.filter(
            (member) => member.memberProjectId !== memberProjectId
          );
          updateTask((prv) => ({ ...prv, taskMembers: newMembers }));
        }

        alert("담당자 삭제가 완료되었습니다.");
      },
      dispatch
    )();
  };

  return (
    <>
      <MemberBoxes>
        {taskMembers &&
          isCheckList &&
          taskMembers.map(
            (member) =>
              member.status === "ACTIVE" && (
                <div key={member.memberProjectId}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      dispatch(
                        taskMembersAction.checkTaskMemberAction({
                          memberProjectId: member.memberProjectId,
                          name: member.name,
                          profileImage: member.profileImage,
                        })
                      )
                    }
                    checked={
                      checkedMembers.filter(
                        (one) => one.memberProjectId === member.memberProjectId
                      ).length > 0
                    }
                  />
                  <MemberInfo>
                    <img src={member.profileImage} alt="회원이미지" />
                    <div>{member.name}</div>
                  </MemberInfo>
                </div>
              )
          )}

        {taskMembers &&
          !isCheckList &&
          taskMembers.map((member) =>
            member.status === "ACTIVE" ? (
              <div key={member.memberProjectId}>
                <MemberInfo
                  onClick={() => {
                    setMemberId(member.memberId);
                    setMemberProfile({ show: true });
                  }}
                  bold="true"
                >
                  <img src={member.profileImage} alt="회원이미지" />
                  <div>{member.name}</div>
                </MemberInfo>
              </div>
            ) : (
              // status = QUIT (삭제 가능하도록 처리)
              <div key={member.memberProjectId}>
                <MemberInfo>
                  <img src={member.profileImage} alt="회원이미지" />
                  <QuitMember>
                    <span>{member.name}</span>
                    <Quit
                      onClick={() =>
                        memberDeleteHandler(member.memberProjectId)
                      }
                    >
                      삭제
                    </Quit>
                  </QuitMember>
                </MemberInfo>
              </div>
            )
          )}

        {isCheckList && (
          <ButtonArea>
            <Button type="button" color="#d6ccc2" onClick={() => toggleList()}>
              완료
            </Button>
            <Button
              type="button"
              onClick={() => {
                toggleList();
                dispatch(taskMembersAction.resetCheckedMember());
              }}
              border="#d6ccc2"
            >
              초기화
            </Button>
          </ButtonArea>
        )}
      </MemberBoxes>
      {memberProfile.show && (
        <MemberProfile
          onClose={() => setMemberProfile({ show: false })}
          memberInformation={{
            isOthers: true,
            memberId: memberId,
            projectId: params.projectId,
          }}
        />
      )}
    </>
  );
}

const MemberBoxes = styled.div`
  max-height: 500px;
  width: 320px;
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

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > img {
    width: 65px;
    height: 65px;
    border-radius: 5rem;
    cursor: pointer;
    border: 5px solid rgba(255, 0, 0, 0);
  }

  & > img:hover {
    border: ${({ bold }) => (bold ? "5px solid #cdb4db" : "none")};
  }
`;

const QuitMember = styled.div`
  & > span:first-child {
    text-decoration: line-through;
  }
`;

const Quit = styled.span`
  margin-left: 10px;
  color: white;
  background-color: red;
  border-radius: 2rem;
  padding: 5px 10px;

  &:hover {
    cursor: pointer;
  }
`;
