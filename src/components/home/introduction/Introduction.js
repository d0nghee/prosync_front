import React from 'react';
import { styled } from 'styled-components';
import Service from './Service';
import test1 from '../../../assets/images/test1.png';
import test2 from '../../../assets/images/test2.png';
import test3 from '../../../assets/images/test3.png';
import test4 from '../../../assets/images/test4.png';
import test5 from '../../../assets/images/test5.png';
import test6 from '../../../assets/images/test6.png';
import test7 from '../../../assets/images/test7.png';
import test8 from '../../../assets/images/test8.png';

const personalDataList = [
  {
    id: 1,
    title: '메인 페이지',
    content:
      '메인 페이지는 해당 사용자가 속한 프로젝트와 모든 프로젝트를 조회하실 수 있는 페이지입니다.\n\n 프로젝트 생성 버튼을 클릭하여 프로젝트를 생성할 수 있으며 더보기를 클릭하여 프로젝트의 리스트를 자세히 보실 수 있습니다.\n\n 상단바를 통해 모든 프로젝트를 검색할 수 있으며 사이드 바를 통해 다른 메뉴로 이동이 가능합니다.',
    img: test1,
    imgSize: 'long',
  },
  {
    id: 2,
    title: '알림 목록 페이지',
    content:
      '알림 목록 페이지는 해당 사용자에게 온 알림 리스트를 조회할 수 있는 페이지입니다. \n\n 알림을 읽음 처리하시거나 삭제를 할 수 있으며 알림을 클릭할 시 해당 알림에 해당되는 페이지로 이동하실 수 있습니다. \n\n 실시간 알림이 제공되며 해당 알림은 토스트 메시지로 확인하실 수 있습니다. ',
    img: test2,
    imgSize: 'short',
  },
  {
    id: 3,
    title: '마이 페이지',
    content:
      '마이 페이지는 해당 사용자의 정보에 대해서 조회하고 수정하실 수 있는 페이지입니다. \n\n 사이드 바에 비밀번호 변경, 회원 프로필 정보 변경, 북마크, 내 프로젝트에 대한 정보 조회하고 수정하실 수 있습니다. \n\n 북마크 페이지에서 해당 사용자가 북마크 체크를 한 프로젝트 목록을 조회하실 수 있습니다. \n내 프로젝트 페이지에서는 해당 사용자가 속한 프로젝트 목록을 조회할 수 있습니다. \n\n 회원 탈퇴 페이지에서 회원 탈퇴를 진행하실 수 있습니다.',
    img: test3,
    imgSize: 'short',
  },
  {
    id: 4,
    title: '로그 목록 페이지',
    content:
      '로그 목록 페이지는 해당 사용자가 프로젝트 관리자인 페이지를 조회하여 해당 프로젝트의 로그 목록을 조회하실 수 있는 페이지입니다. \n\n 로그는 프로젝트에서 발생한 이벤트에 대한 정보를 의미하며 프로젝트 구성원들의 작업을 쉽게 파악하실 수 있습니다. \n\n 로그를 클릭할 시 해당 로그에 해당되는 페이지로 이동하실 수 있습니다.',
    img: test4,
    imgSize: 'short',
  },
];

const publicDataList = [
  {
    id: 1,
    title: '프로젝트 상세 페이지',
    content:
      '프로젝트 상세 페이지는 해당 프로젝트에 대한 정보를 조회하실 수 있는 페이지입니다. \n\n 해당 페이지에서 프로젝트의 소개글을 조회하실 수 있으며 프로젝트의 구성원 및 구성원의 프로필 정보를 조회하실 수 있습니다. \n\n Pulic(공개) 프로젝트일 시 모든 사용자가 프로젝트에 대한 정보를 조회할 수 있으며 해당 프로젝트 업무 목록 페이지로 이동이 가능합니다. \n프로젝트의 관리자는 상세 페이지에서 프로젝트 수정, 프로젝트 멤버 관리 페이지로 이동하실 수 있습니다. ',
    img: test5,
    imgSize: 'long',
  },
  {
    id: 2,
    title: '프로젝트 멤버 관리 페이지',
    content:
      '프로젝트 멤버 관리 페이지는 해당 프로젝트의 관리자가 프로젝트의 구성원에 대한 정보를 수정하실 수 있는 페이지입니다. \n\n 프로젝트 구성원을 강퇴할 수 있으며 권한 변경 또한 가능합니다. \n\n 사용자를 프로젝트에 초대하기 위한 초대 링크 생성을 지원하고 있습니다. 초대 링크를 복사하신 후 초대하고 싶은 사용자에게 전달하여 해당 초대 링크로 접속할 시 프로젝트에 초대됩니다. ',
    img: test6,
    imgSize: 'long',
  },
  {
    id: 3,
    title: '프로젝트 업무 목록 페이지',
    content:
      '프로젝트 업무 목록 페이지는 해당 프로젝트 관련 업무 목록을 조회하실 수 있는 페이지입니다. \n\n 프로젝트의 업무 목록을 테이블,보드,로드맵 3가지 View를 통해 다양한 UI로 조회하실 수 있습니다. 보드 뷰를 통해 업무 상태에 따라 업무를 조회하실 수 있으며 로드맵 뷰를 통해 업무 기한에 따라 업무를 조회하실 수 있습니다. \n\n 프로젝트의 관리자와 Writer 권한을 가진 사용자는 해당 페이지에서 업무에 대한 정보를 간단하게 수정하실 수 있습니다.',
    img: test7,
    imgSize: 'long',
  },
  {
    id: 4,
    title: '업무 상세 페이지',
    content:
      '업무 상세 페이지는 해당 업무의 정보와 댓글을 조회할 수 있는 페이지입니다. \n\n 해당 업무에 대한 정보를 조회할 수 있으며 업무에 등록된 파일을 조회하실 수 있습니다. 프로젝트 관리자 또는 Writer 권한을 가진 사용자는 해당 업무를 수정 가능합니다. \n\n 업무에 등록된 댓글을 조회하실 수 있으며 댓글 작성자의 프로필 정보를 조회하실 수 있습니다. \n\n 댓글에 등록된 파일을 조회하실 수 있으며 본인이 작성한 댓글을 수정하고 삭제하실 수 있습니다.',
    img: test8,
    imgSize: 'long',
  },
];

const IntroductionContainer = styled.div`
  width: 100%;
  height: 170rem;
  display: flex;
  flex-direction: column;
  background-color: white;

  & > .personal-title {
    font-size: 5rem;
    font-weight: 900;
    text-align: center;
    color: black;
    height: 7%;
    padding-top: 1%;
  }

  & > .public-title {
    font-size: 5rem;
    font-weight: 900;
    text-align: center;
    color: black;
    background-color: rgb(151, 138, 220);
    padding-top: 1%;
    height: 7%;
  }

  & > .footer-spare {
    height: 6%;
    background-color: rgb(151, 138, 220);
  }
`;

const Introduction = () => {
  return (
    <IntroductionContainer>
      <div className="personal-title">개인 서비스</div>
      <Service isPersonal={'personal'} dataList={personalDataList} />
      <div className="public-title">프로젝트 업무 서비스</div>
      <Service isPersonal={'pulbic'} dataList={publicDataList} />
      <div className="footer-spare" />
    </IntroductionContainer>
  );
};

export default Introduction;
