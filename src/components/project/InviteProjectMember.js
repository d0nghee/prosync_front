import { useEffect, useState } from 'react';
import { getApi, postApi } from '../../util/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tryFunc } from '../../util/tryFunc';
import NoContent from './NoContent';
import LoadingSpinner from '../common/LoadingSpinner';

export default function InviteProjectMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const inviteCode = params.inviteCode;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inviteCode) {
      const postInvite = async () => {
        setIsLoading(true);
        const response = await postApi(`/invitation/${inviteCode}`);
        return response;
      };
      tryFunc(
        postInvite,
        (response) => navigate(`/projects/${response.data.data.projectId}`),
        dispatch
      )();
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return <NoContent body={'유효하지 않은 링크 입니다'} />;
}
