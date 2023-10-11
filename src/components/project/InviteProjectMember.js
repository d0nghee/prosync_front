import { useEffect } from 'react';
import { getApi, postApi } from '../../util/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tryFunc } from '../../util/tryFunc';

export default function InviteProjectMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const inviteCode = params.inviteCode;
  useEffect(() => {
    if (inviteCode) {
      tryFunc(
        async () => postApi(`/invitation/${inviteCode}`),
        (response) => navigate(`/projects/${response.data.data.projectId}`),
        dispatch
      )();
    }
  }, []);

  return <div>InviteProjectMember</div>;
}
