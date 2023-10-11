import { useRouteLoaderData } from 'react-router-dom';
import ProjectForm from '../../components/project/ProjectForm';
import { getApi } from '../../util/api';
import { tryFunc } from '../../util/tryFunc';
import { useDispatch } from 'react-redux';

export default function EditProejct() {
  const data = useRouteLoaderData('edit');
  const project = data?.data || {};

  console.log('project', project);

  return (
    <>
      <ProjectForm method="PATCH" project={project} />
    </>
  );
}

export async function loader({ params }) {
  const projectId = params.projectId;

  const data = await getApi(`/projects/${projectId}`);

  return data;
}
