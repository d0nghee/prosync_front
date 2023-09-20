import Project from '../../components/project/Project';
import { getApi } from '../../util/api';
import { useLocation, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';

export default function ProejctList() {
  const data = useRouteLoaderData('projects');
  const projects = data;
  const pageInfo = projects.pageInfo;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const page = queryParams.get('page');
  const size = queryParams.get('size') || 10;

  console.log('page', page);
  console.log('size', size);
  console.log('projects', projects);

  return (
    <ProjectGrid>
      {projects.data.slice(0, size).map((project, index) => (
        <Project key={project.projectId} projects={project} />
      ))}
      {Array(10 - projects.data.length)
        .fill()
        .map((_, idx) => (
          <div key={idx} />
        ))}
    </ProjectGrid>
  );
}

export async function loader({ params }) {
  const data = await getApi(`/projects`);
  return data.data;
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px; // 컴포넌트 사이의 간격
`;
