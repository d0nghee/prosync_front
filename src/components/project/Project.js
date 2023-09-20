import styled from 'styled-components';

export default function Project({
  projects: {
    title = 'default title',
    startDate = 'default startDate',
    endDate = 'default endDate',
    projectImage = 'default projectImage',
  } = {},
  member: { name = 'default name' } = {},
}) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{projectImage}</Content>
      <Footer>
        <Dates>
          <div>{startDate}</div>
          <div>{endDate}</div>
        </Dates>
        <Author>{name}</Author>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 300px; // 고정된 너비를 설정
  height: 400px; // 고정된 높이를 설정 (원하는 높이로 조절 가능)
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  background-color: black;
  height: 200px;
  padding: 20px 0;
  background-image: url(${(props) => props.image});
  background-size: cover; // 이미지 크기 조절
  background-position: center; // 이미지 중앙 정렬
  overflow: hidden; // 오버플로우 숨기기
`;

const Header = styled.header`
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #e5e5e5;
  padding-top: 10px;
`;

const Dates = styled.div`
  font-size: 14px;
`;

const Author = styled.div`
  font-size: 14px;
`;
