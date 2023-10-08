// import { styled } from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";
// import { tryFunc } from "../../../util/tryFunc";
// import { deleteTaskMemberApi } from "../../../util/api";
// import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
// import { useState } from "react";

// export default function TaskMemberList({
//   taskMembers, //TODO: checklist인 경우 -> project member (프로젝트 회원 redux 로)
//   isCheckList,
//   toggleList,
//   taskId,
// }) {
//   const dispatch = useDispatch();
//   const checkedMembers = useSelector(
//     (state) => state.taskMembers.checkedMembers
//   );
//   const memberDeleteHandler = (memberProjectId) => {
//     tryFunc(
//       () =>
//         deleteTaskMemberApi(taskId, {
//           projectMemberIds: [memberProjectId],
//         }),
//       () => {
//         dispatch(
//           taskListAction.updateBoardTaskMembers({ memberProjectId, taskId })
//         );
//         //TODO: 업무 조회, 수정 화면
//         alert("담당자 삭제가 완료되었습니다.");
//       }
//     )();
//   };

//   console.log(taskMembers, "taskmember");

//   return (
//     <>
//       <MemberBoxes>
//         {taskMembers &&
//           isCheckList &&
//           taskMembers.map(
//             (member) =>
//               member.status === "ACTIVE" && (
//                 <div key={member.memberProjectId}>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       dispatch(
//                         taskMembersAction.checkTaskMemberAction({
//                           memberProjectId: member.memberProjectId,
//                           name: member.name,
//                           profileImage: member.profileImage,
//                         })
//                       )
//                     }
//                     checked={
//                       checkedMembers.filter(
//                         (one) => one.memberProjectId === member.memberProjectId
//                       ).length > 0
//                     }
//                   />
//                   <MemberInfo>
//                     <img src={member.profileImage} alt="회원이미지" />
//                     <div>{member.name}</div>
//                   </MemberInfo>
//                 </div>
//               )
//           )}

//         {taskMembers &&
//           !isCheckList &&
//           taskMembers.map((member) =>
//             member.status === "ACTIVE" ? (
//               <div key={member.memberProjectId}>
//                 <MemberInfo>
//                   <img src={member.profileImage} alt="회원이미지" />
//                   <div>{member.name}</div>
//                 </MemberInfo>
//               </div>
//             ) : (
//               // status = QUIT (삭제 가능하도록 처리)
//               <div key={member.memberProjectId}>
//                 <MemberInfo>
//                   <img src={member.profileImage} alt="회원이미지" />
//                   <QuitMember>
//                     <span>{member.name}</span>
//                     <Quit
//                       onClick={() =>
//                         memberDeleteHandler(member.memberProjectId)
//                       }
//                     >
//                       삭제
//                     </Quit>
//                   </QuitMember>
//                 </MemberInfo>
//               </div>
//             )
//           )}

//         {isCheckList && (
//           <ButtonArea>
//             <Button type="button" color="#d6ccc2" onClick={() => toggleList()}>
//               완료
//             </Button>
//             <Button
//               type="button"
//               onClick={() => {
//                 toggleList();
//                 dispatch(taskMembersAction.resetCheckedMember());
//               }}
//               border="#d6ccc2"
//             >
//               초기화
//             </Button>
//           </ButtonArea>
//         )}
//       </MemberBoxes>
//     </>
//   );
// }

// const MemberBoxes = styled.div`
//   max-height: 500px;
//   width: 400px;
//   border: 1px solid #dad7cd;
//   padding: 1rem;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   overflow: auto;
//   padding: 1.5rem;

//   & > div {
//     margin-bottom: 15px;
//     padding-bottom: 10px;
//     border-bottom: 1px solid #e3d5ca;
//     width: 100%;
//     display: flex;
//   }

//   & > div:last-child {
//     margin-bottom: 0;
//     border: none;
//     padding-bottom: 0;
//   }

//   & > div > input[type="checkbox"] {
//     margin-right: 10px;
//     width: 13px;
//   }
// `;
// const ButtonArea = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;
// const Button = styled.button`
//   padding: 10px;
//   width: 100%;
//   background-color: ${(props) => props.color || "white"};
//   border-radius: 20px;
//   border: ${(props) => (props.border ? props.border + " 1px solid" : "none")};
//   color: ${(props) => props.fontcolor || "#333"};
// `;

// const MemberInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   & > img {
//     width: 50px;
//     height: 50px;
//     border-radius: 2rem;
//     cursor: pointer;
//   }

//   & > img:hover {
//     border: 1px solid red;
//   }
// `;

// const QuitMember = styled.div`
//   & > span:first-child {
//     text-decoration: line-through;
//   }
// `;

// const Quit = styled.span`
//   margin-left: 5px;
//   color: red;
//   border: 1px solid red;
//   border-radius: 1rem;
//   padding: 10px;

//   &:hover {
//     cursor: pointer;
//   }
// `;

import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { taskMembersAction } from "../../../redux/reducers/task/taskMembers-slice";
import { tryFunc } from "../../../util/tryFunc";
import { deleteTaskMemberApi } from "../../../util/api";
import { taskListAction } from "../../../redux/reducers/task/taskList-slice";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MemberProfile from "../../common/MemberProfile";
import { useEffect } from "react";

export default function TaskMemberList({
  taskMembers, //TODO: checklist인 경우 -> project member (프로젝트 회원 redux 로)
  isCheckList,
  toggleList,
  taskId,
}) {
  const dispatch = useDispatch();
  const [memberProfile, setMemberProfile] = useState({show: false});
  const [memberId, setMemberId] = useState(null);
  const location = useLocation();
  const parts = location.pathname.split('/');
    const projectId = parts[2]; 

  

  
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
        //TODO: 업무 조회, 수정 화면
        alert("담당자 삭제가 완료되었습니다.");
      }
    )();
  };

  console.log(taskMembers, "taskmember");

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
                <MemberInfo onClick={() => {setMemberId(member.memberId); setMemberProfile({show:true})}}>
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
      {
      memberProfile.show && (
        <MemberProfile onClose={() => setMemberProfile({show:false})} memberInformation={{isOthers:true,memberId:memberId ,projectId: projectId}}/>
      )
    }
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
    border-radius: 2rem;
    cursor: pointer;
  }

  & > img:hover {
    border: 1px solid red;
  }
`;

const QuitMember = styled.div`
  & > span:first-child {
    text-decoration: line-through;
  }
`;

const Quit = styled.span`
  margin-left: 5px;
  color: red;
  border: 1px solid red;
  border-radius: 1rem;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;
