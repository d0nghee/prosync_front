import styled from "styled-components";
import { useEffect, useState } from "react";
import Member from "./Member";
import { deleteApi, patchApi, postApi } from "../../util/api";
import InviteModal from "./InviteModal";
import { useDispatch } from "react-redux";
import { tryFunc } from "../../util/tryFunc";
import LoadingSpinner from "../common/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectMembers } from "../../redux/reducers/member/memberAuthoritySlice";
import { useNavigate } from "react-router-dom";

export default function ProjectMember({ members, projectId }) {
  const [checkMembers, setCheckMembers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const authorityState = useSelector(selectMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ADMIN , QUIT 필터 처리
  useEffect(() => {
    console.log("member filter 진입");

    const result = members.filter(
      (member) => member.authority !== "ADMIN" && member.status !== "QUIT"
    );
    setFilteredMembers(result);
  }, [members]);

  // 필터 처리된 멤버들로 checkMember 초기화
  useEffect(() => {
    const initialCheckStatus = filteredMembers.reduce((acc, member) => {
      acc[member.memberProjectId] = allChecked;
      return acc;
    }, {});
    setCheckMembers(initialCheckStatus);
  }, [allChecked, filteredMembers]);

  // 모두 체크 , 체크 해제
  const allCheckMembers = () => {
    setAllChecked((prev) => !prev); // 모든 체크박스의 상태를 변경

    const newStatus = { ...checkMembers };
    filteredMembers.forEach((member) => {
      newStatus[member.memberProjectId] = !allChecked;
    });

    setCheckMembers(newStatus);
  };

  // 멤버 권한 변경사항들 promise all로 patch 처리
  const submitHandler = async () => {
    const isConfirmed = window.confirm("변경사항을 저장하시겠습니까?");

    if (!isConfirmed) return;

    setIsLoading(true);

    const patchMemberAuthority = await authorityState.map((item) => {
      return tryFunc(
        () =>
          patchApi(`/project-members/${item.memberProjectId}`, {
            authority: item.authority,
          }),
        () => {
          window.location.href = `/projects/${projectId}`;
        },
        dispatch
      )();
    });

    Promise.all(patchMemberAuthority).then(() => {
      setFilteredMembers((prevMembers) => [...prevMembers]);
      setIsLoading(false);
    });
  };

  // 체크 박스 변화 시
  const handleCheckboxChange = (memberProjectId) => {
    setCheckMembers((prevCheckMembers) => {
      const currentCheckedStatus = prevCheckMembers[memberProjectId];
      return {
        ...prevCheckMembers,
        [memberProjectId]: !currentCheckedStatus,
      };
    });
  };

  // 멤버 삭제 Promise
  const deleteMemberHandler = async () => {
    const noSelectMember = Object.values(checkMembers).some(
      (value) => value === true
    );

    if (!noSelectMember) {
      alert("멤버를 선택 해주세요");
      return;
    }

    const isConfirmed = window.confirm(
      "선택된 멤버를 정말로 삭제하시겠습니까?"
    );

    if (!isConfirmed) return;

    setIsLoading(true);

    const checkedMemberProjectIds = Object.keys(checkMembers)
      .filter((memberProjectId) => checkMembers[memberProjectId])
      .map((id) => +id);

    setIsLoading(true);
    // 삭제된 멤버들을 filteredMembers에서 제거
    const updateMembers = () => {
      const updatedFilteredMembers = filteredMembers.filter(
        (member) => !checkedMemberProjectIds.includes(member.memberProjectId)
      );
      setFilteredMembers(updatedFilteredMembers);
    };

    const deleteRequests = checkedMemberProjectIds.map((memberProjectId) =>
      tryFunc(
        () => deleteApi(`/project-members/${memberProjectId}`),
        updateMembers,
        dispatch
      )()
    );

    await Promise.all(deleteRequests);

    setIsLoading(false);
  };

  // 초대 링크 생성
  const handleInvite = () => {
    setIsLoading(true);
    const invitePost = async () => {
      const response = await postApi(`/projects/${projectId}/invitation`);
      console.log("invitePost", response);

      return response;
    };

    // 초대 코드 생성 성공
    const invitePostSuccess = (response) => {
      console.log("invitePostSuccess");
      const inviteCode = response.data.data.inviteCode;
      setInviteLink(
        `http://prosyncfront.s3-website.ap-northeast-2.amazonaws.com/projects/invite/${inviteCode}`
      );
      setIsModalOpen(true);
      setIsLoading(false);
    };

    // 에러 처리
    tryFunc(invitePost, (response) => invitePostSuccess(response), dispatch)();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inviteLink={inviteLink}
      />
      <MenuContainer>
        <input type="checkbox" onClick={allCheckMembers}></input>
        <div>
          <StyledButton
            onClick={handleInvite}
            color="#FFC107"
            hoverColor="#FFA000"
          >
            초대 링크 생성
          </StyledButton>
          <StyledButton
            onClick={deleteMemberHandler}
            color="#F44336"
            hoverColor="#d32f2f"
          >
            삭제
          </StyledButton>
          <StyledButton
            onClick={submitHandler}
            color="#4CAF50"
            hoverColor="#45a049"
          >
            저장
          </StyledButton>
        </div>
      </MenuContainer>
      <MembersContainer>
        {filteredMembers && filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <Member
              key={index}
              member={member}
              isChecked={checkMembers[member.memberProjectId]}
              onCheckChange={() => handleCheckboxChange(member.memberProjectId)}
            />
          ))
        ) : (
          <NoMembers>멤버가 없습니다</NoMembers>
        )}
      </MembersContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 800px;
  padding: 20px;

  background-color: #fff;
`;

const MembersContainer = styled.div`
  margin-top: 40px;
  height: 800px;
  margin-left: 300px;
  margin-right: 300px;
  overflow: scroll;
`;

const NoMembers = styled.div`
  color: #888;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 이 부분을 추가
  margin-left: 300px;
  margin-right: 300px;
  background: #f5f6f9;
  padding: 20px;
  background: #f8f9f6;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  background-color: ${(props) => props.color || "#6672fb"};

  &:hover {
    background-color: ${(props) => props.hoverColor || "#5b67ca"};
  }

  &:first-child {
    margin-left: 0;
  }
`;
