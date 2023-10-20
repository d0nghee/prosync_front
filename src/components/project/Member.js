import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { tryFunc } from '../../util/tryFunc';
import { patchApi } from '../../util/api';
import { useNavigate, useParams } from 'react-router-dom';

import {
  addAuthority,
  removeAuthority,
} from '../../redux/reducers/member/memberAuthoritySlice';

export default function Member({ member, isChecked, onCheckChange }) {
  const dispatch = useDispatch();
  const originalAuthority = member.authority;
  const [newAuthority, setNewAuthority] = useState('');
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const adminData = {
    authority: 'ADMIN',
  };

  // 위임하기 버튼 밖에 누르면 버튼 사라짐
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 권한 변경 데이터 리덕스로
  const onChangeAuthority = (e) => {
    const selectedAuthority = e.target.value;
    console.log('onChangeAuthority');
    setNewAuthority(selectedAuthority);
    if (selectedAuthority === originalAuthority) {
      console.log('remove', selectedAuthority);

      dispatch(removeAuthority(member.memberProjectId));
    } else if (selectedAuthority !== originalAuthority) {
      console.log('add', selectedAuthority);
      dispatch(
        addAuthority({
          memberProjectId: member.memberProjectId,
          authority: selectedAuthority,
        })
      );
    }
  };

  // 이름 누르면 밑에 위임하기 버튼 뜨게 하기
  const handleNameClick = () => {
    setShowButton((prev) => !prev);
  };

  // 위임 수락
  const handleConfirm = () => {
    // 권한 변경
    const mandateAdmin = async () => {
      const response = await patchApi(
        `/project-members/${member.memberProjectId}`,
        adminData
      );
      return response;
    };

    tryFunc(
      mandateAdmin,
      (response) => (window.location.href = `/projects/${member.projectId}`),
      dispatch
    )();
  };

  // 위임하기 버튼 클릭
  const handleAdminButtonClick = () => {
    const isConfirmed = window.confirm('정말로 ADMIN 권한을 위임하시겠습니까?');
    if (isConfirmed) {
      handleConfirm();
    }
  };

  return (
    <>
      <MemberContainer>
        <LeftContainer>
          <input type="checkbox" checked={isChecked} onChange={onCheckChange} />
          <ProfileImage
            src={member.profileImage}
            alt={`${member.name}'s profile`}
          />
          <NameContainer ref={buttonRef}>
            <MemberName onClick={handleNameClick}>{member.name}</MemberName>
            {showButton && (
              <AdminButton onClick={handleAdminButtonClick}>
                ADMIN 위임하기
              </AdminButton>
            )}
          </NameContainer>
        </LeftContainer>
        <CenterContainer>
          <StyledAuthoritySelect
            value={newAuthority}
            onChange={onChangeAuthority}
          >
            {originalAuthority === 'READER' && (
              <>
                <option value="READER">READER</option>
                <option value="WRITER">WRITER</option>
              </>
            )}
            {originalAuthority === 'WRITER' && (
              <>
                <option value="WRITER">WRITER</option>
                <option value="READER">READER</option>
              </>
            )}
          </StyledAuthoritySelect>
        </CenterContainer>
      </MemberContainer>
    </>
  );
}

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background: #f8f9f6;
  padding: 20px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const NameContainer = styled.div`
  position: relative;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 10px;
`;

const MemberName = styled.span`
  margin-left: 30px;
  cursor: pointer;
`;

const StyledAuthoritySelect = styled.select`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
  cursor: pointer;
  appearance: none;
  &:focus {
    outline: none;
    border-color: #90cdf4;
  }
`;

const AdminButton = styled.button`
  display: block;

  top: 100%; // 이름 바로 아래에 위치
  left: 0; // 이름의 왼쪽에 정렬
  background-color: #6672fb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5b67ca;
  }
`;
