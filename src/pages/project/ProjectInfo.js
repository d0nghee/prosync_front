import { useLoaderData, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TeamMembers from '../../components/project/TeamMembers';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { getCookie } from '../../util/cookies';
import { GrUserSettings } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function ProjectInfo({ projectMembers }) {
  const data = useLoaderData();

  const params = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (projectMembers) {
      const admin =
        projectMembers.find((member) => member.authority === 'ADMIN')
          .memberId === getCookie('memberId');
      setIsAdmin(admin);
    }
  }, [params.projectId, projectMembers]);

  return (
    <>
      <Section ref={ref} inView={inView}>
        <Total>
          <ProjectInformation>
            <Title>
              <h1>{data.data.title}</h1>
              <Edit>
                <div>
                  <span>{data.data.modifiedAt.replace('T', ' ')} 업데이트</span>
                </div>
                {isAdmin && (
                  <>
                    <div>
                      <Link to={`/projects/${params.projectId}/edit`}>
                        <AiFillEdit size="31px" />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/projects/${params.projectId}/members`}>
                        <GrUserSettings size="27px" />
                      </Link>
                    </div>
                  </>
                )}
                <div>
                  <span>{data.data.modifiedAt.replace('T', ' ')} 업데이트</span>
                </div>
              </Edit>
            </Title>
            <Detail>
              <img src={data.data.projectImage} alt="" />
              <SideInfo>
                <ProjectSideInfo>
                  <li>
                    <span>프로젝트 기간</span>
                    <span>
                      {data.data.startDate} ~ {data.data.endDate}
                    </span>
                  </li>
                  <li>
                    <span>생성일</span>
                    <span>{data.data.createdAt.substring(0, 10)}</span>
                  </li>
                  <li>
                    <span>프로젝트 구성원</span>
                    <span>{projectMembers ? projectMembers.length : 0}명</span>
                  </li>
                  <li>
                    <span>공개 여부</span>
                    <span>{data.data.isPublic ? 'YES' : 'NO'}</span>
                  </li>
                </ProjectSideInfo>
                <Link to={`/projects/${params.projectId}/tasks`}>
                  프로젝트 업무리스트로 이동하기
                </Link>
              </SideInfo>
            </Detail>
            <div>
              <IntroTitle>프로젝트 소개</IntroTitle>
              <Intro>{data.data.intro}</Intro>
            </div>
          </ProjectInformation>
        </Total>
      </Section>

      <Section ref={ref2} inView={inView2}>
        {projectMembers && <TeamMembers projectMembers={projectMembers} />}
      </Section>
    </>
  );
}

const IntroTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  padding: 1rem 0;
`;
const Edit = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & > div {
    padding: 5px;
    border-radius: 1rem;
  }

  & > div:not(:first-child) {
    &:hover {
      background-color: #d9d9d9;
    }
  }
`;

const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > a {
    display: flex;
    width: 100%;
    background-color: hsl(226, 100%, 65%);
    padding: 20px;
    justify-content: center;
    border-radius: 9px;
    color: #fff;
    font-weight: bold;
  }

  & > a:hover {
    opacity: 0.7;
  }
`;

const ProjectSideInfo = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  gap: 8px;
  background-color: rgb(245, 245, 245);

  & > li {
    display: flex;
    gap: 1rem;

    span:first-child {
      display: inline-block;
      min-width: 80px;
      font-weight: 700;
      line-height: 150%;
      color: hsl(230, 4%, 50%);
      width: 120px;
    }

    span:last-child {
      font-weight: 500;
      line-height: 150%;
      color: hsl(230, 4%, 0%);
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 5px;

  & > div {
    font-size: 20px;
    opacity: 0.6;
  }
`;
const Section = styled.div`
  opacity: 0;
  transform: translateY(-50px);
  transition: opacity 0.5s, transform 1s;
  ${(props) =>
    props.inView &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
  padding: 5rem 10rem;
  gap: 3rem;
  align-items: center;
`;

const Intro = styled.div`
  border: 1px solid #a19b9b;
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  font-size: 1.5rem;
`;

const Detail = styled.div`
  display: flex;
  gap: 3rem;

  & > div {
    width: 40%;
  }

  & > img {
    height: 400px;
    border-radius: 10px;
    width: 60%;
  }
`;

export const ProjectInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 1280px;
  font-size: 1.2rem;
`;
