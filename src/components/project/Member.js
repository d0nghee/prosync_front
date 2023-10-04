import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminModal from './AdminModal';
import { tryFunc } from '../../util/tryFunc';
import { patchApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';
import {
  selectCheckbox,
  toggleCheckbox,
} from '../../redux/reducers/memberCheckboxSlice';
import {
  addAuthority,
  removeAuthority,
} from '../../redux/reducers/memberAuthoritySlice';
import { useSelector } from 'react-redux';

export default function Member({ member }) {
  const checkboxState = useSelector(selectCheckbox);
  const dispatch = useDispatch();
  const originalAuthority = member.authority;
  const [newAuthority, setNewAuthority] = useState('');
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isChecked =
    checkboxState.checkbox[member.memberProjectId]?.checked || false;
  const adminData = {
    authority: 'ADMIN',
  };

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

  const handleNameClick = () => {
    setShowButton((prev) => !prev);
  };

  // 위임 수락
  const handleConfirm = () => {
    console.log('handleConfirm');
    tryFunc(mandateAdmin, mandateAdminSuccess, mandateAdminError)();
    setIsModalOpen(false);
  };

  const mandateAdmin = async () => {
    console.log('mandateAdmin');
    const response = patchApi(
      `/project-members/${member.memberProjectId}`,
      adminData
    );
    return response;
  };

  const mandateAdminSuccess = () => {
    navigate('/projects');
  };

  const mandateAdminError = {
    500: (error) => {
      console.error('Server Error:', error);
      alert('서버에서 오류가 발생했습니다.');
    },
    404: (error) => {
      console.error('Not Found:', error);
      alert('프로젝트 정보를 찾을 수 없습니다.');
    },
    default: (error) => {
      console.error('Unknown error:', error);
      alert('프로젝트 목록을 가져오는 중 오류가 발생하였습니다.');
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAdminButtonClick = () => {
    handleOpenModal();
  };

  const handleMemberCheck = () => {
    dispatch(toggleCheckbox({ id: member.memberProjectId }));
  };

  return (
    <>
      <MemberContainer>
        <LeftContainer>
          <CheckboxContainer>
            <HiddenCheckbox checked={isChecked} onChange={handleMemberCheck} />
            <StyledCheckbox checked={isChecked} />
          </CheckboxContainer>
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
      <AdminModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background: #f5f6f9;
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

const CheckboxContainer = styled.div`
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? '#5B67CA' : '#E0E0E0')};
  border-radius: 4px;
  transition: all 150ms;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 10px;
`;

const MemberName = styled.span`
  margin-left: 10px;
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
  position: absolute;
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
