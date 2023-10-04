import { useRouteLoaderData } from 'react-router-dom';
import RoadmapViewList from '../../components/task/RoadmapViewList';
import { getApi } from '../../util/api';

export default function TaskRoadmapPage() {
  const data = useRouteLoaderData('task-roadmap');

  const tasks = data?.tasks?.data?.data || [];
  const status = data.statusData.data.data;

  return <RoadmapViewList tasks={tasks} status={status} />;
}

export async function loader({ params }) {
  const projectId = params.projectId;
  try {
    const tasks = await getApi(`/projects/${projectId}/tasks`);
    const statusData = await getApi(`/projects/${projectId}/task-status`);

    return { tasks, statusData };
  } catch (error) {
    console.error('Error loading data', error);
    return {};
  }
}
