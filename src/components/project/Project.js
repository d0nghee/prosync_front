import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteApi, postApi } from '../../util/api';
import { tryFunc } from '../../util/tryFunc';
import { useNavigate } from 'react-router-dom';

export default function Project({
  projects: {
    title = '',
    startDate = '',
    endDate = '',
    projectImage = '',
    projectId = '',
    name = '',
    bookmarkId = '',
  } = {},
  onStarChange,
}) {
  const [isStarred, setIsStarred] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = () => {
    console.log('handleStarClick');
    tryFunc(changeBookmark)();
  };

  const changeBookmark = async () => {
    if (isStarred) {
      console.log('isStar 호출');
      deleteApi(`/bookmark/${projectId}`).then(() => {
        setIsStarred(false);
        onStarChange();
      });
    } else {
      console.log('!isStar 호출');
      postApi(`/bookmark/${projectId}`).then(() => {
        setIsStarred(true);
        onStarChange();
      });
    }
  };

  useEffect(() => {
    if (bookmarkId) setIsStarred(true);
  }, [bookmarkId]);

  const navigateHandler = () => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <Container onClick={navigateHandler}>
      <Header>
        <Title>{title}</Title>
        <StarButton onClick={handleStarClick}>
          <StarImage
            src={
              isStarred
                ? process.env.PUBLIC_URL + '/img/fill-star.png'
                : process.env.PUBLIC_URL + '/img/star.png'
            }
            alt="Star"
          />
        </StarButton>
      </Header>
      <Content>
        <Image src={projectImage} alt="Project" />
      </Content>
      <Footer>
        <Dates>
          <label>프로젝트 기간</label>
          <div>{startDate}</div>
          <div>{endDate}</div>
        </Dates>
        <Author>{name}</Author>
      </Footer>
    </Container>
  );
}
const StarImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const Container = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  margin: 4px;
  &:hover {
    border: 1px solid #333;
  }
`;

const Content = styled.div`
  background-color: black;
  height: 160px;
  padding: 15px 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5d5d5; // 더 부드러운 색상의 경계선
  padding-bottom: 8px;
  border: 1px solid grey;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 20px; // 글꼴 크기 감소
  margin: 0;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-top: 1px solid #f5d5d5; // 더 부드러운 색상의 경계선
  padding-top: 8px;
`;

const Dates = styled.div`
  font-size: 12px; // 글꼴 크기 감소
`;

const Author = styled.div`
  font-size: 12px; // 글꼴 크기 감소
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  font-size: 18px; // 글꼴 크기 감소
`;
