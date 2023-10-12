import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
import { tryFunc } from "../../util/tryFunc";
import { useDispatch } from "react-redux";
import { getProjectMembersApi } from "../../util/api";

export default function Project() {
  const params = useParams();
  const dispatch = useDispatch();
  const [projectMembers, setProjectMembers] = useState();

  useEffect(() => {
    tryFunc(
      () => getProjectMembersApi(params.projectId, { size: 100 }),
      (members) => setProjectMembers(members),
      dispatch
    )();
  }, [params.projectId]);

  return <ProjectInfo projectMembers={projectMembers} />;
}
