import { styled } from "styled-components";
import ProfileCard from "../../common/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";

export default function TaskMemberList({
  taskMembers, //TODO: checklist인 경우 -> project member (프로젝트 회원 redux 로)
  isCheckList,
  toggleList,
}) {
  const dispatch = useDispatch();

  const checkedMembers = useSelector(
    (state) => state.taskMembers.checkedMembers
  );

  return (
    <>
      <MemberBoxes>
        {taskMembers &&
          taskMembers.map((member) => (
            <div key={member.memberProjectId}>
              {isCheckList && (
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
              )}
              <MemberInfo>
                <img src={member.profileImage} />
                <div>{member.name}</div>
              </MemberInfo>
            </div>
          ))}
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
    </>
  );
}

const MemberBoxes = styled.div`
  max-height: 500px;
  width: 400px;
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
    width: 50px;
    height: 50px;
  }
`;
