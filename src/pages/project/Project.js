import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectInfo from './ProjectInfo';
import { getProjectMembersApi } from '../../util/api';
import { tryFunc } from '../../util/tryFunc';
import { useDispatch } from 'react-redux';

export default function Project() {
  const [projectMembers, setProjectMembers] = useState();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    tryFunc(
      () => getProjectMembersApi(params.projectId, { size: 100 }),
      (projectMembers) => {
        const members = projectMembers.filter(
          (member) => member.status === 'ACTIVE'
        );
        setProjectMembers(members);
      },
      dispatch
    )();
  }, [params.projectId]);

  return <ProjectInfo projectMembers={projectMembers} />;
}
