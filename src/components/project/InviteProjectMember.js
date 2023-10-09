import { useEffect } from 'react';
import { getApi, postApi } from '../../util/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function InviteProjectMember() {
  const navigate = useNavigate();
  const params = useParams();
  const inviteCode = params.inviteCode;
  useEffect(() => {
    if (inviteCode) {
      postApi(`/invitation/${inviteCode}`).then((response) => {
        navigate(`/projects/${response.data.data.projectId}`);
        console.log(response, 'invite');
      });
    } else return;
  }, []);
  return <div>InviteProjectMember</div>;
}
