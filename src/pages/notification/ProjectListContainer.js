import { React, useState, useEffect } from "react";
import { useParams, json, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "./../../components/notification/Pagination";
import { getApi } from "../../util/api";
import ProjectLogList from "./../../components/notification/ProjectLogList";
import UpperBar from "./../../components/notification/UpperBar";
import { useLocation } from "react-router-dom";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { tryFunc } from "../../util/tryFunc";
import ListLoadingSpinner from './../../components/common/ListLoadingSpinner';
import { useDispatch } from "react-redux";

const codeInformation = [
  {
    id: 1,
    code: "TASK_REMOVE",
    value: "업무삭제",
  },
  {
    id: 2,
    code: "TASK_ASSIGNMENT",
    value: "업무지정",
  },
  {
    id: 3,
    code: "TASK_MODIFICATION",
    value: "업무수정",
  },
  {
    id: 4,
    code: "TASK_EXCLUDED",
    value: "업무제외",
  },
  {
    id: 5,
    code: "PROJECT_ASSIGNMENT",
    value: "프로젝트지정",
  },
  {
    id: 6,
    code: "PROJECT_EXCLUDED",
    value: "프로젝트제외",
  },
  {
    id: 7,
    code: "PROJECT_MODIFICATION",
    value: "프로젝트수정",
  },
  {
    id: 8,
    code: "PROJECT_REMOVE",
    value: "프로젝트삭제",
  },
  {
    id: 9,
    code: "PROJECT_EXIT",
    value: "프로젝트탈퇴",
  },
  {
    id: 10,
    code: "COMMENT_ADD",
    value: "댓글추가",
  },
  {
    id: 11,
    code: "COMMENT_REMOVE",
    value: "댓글삭제",
  },
  {
    id: 12,
    code: "COMMENT_MODIFICATION",
    value: "댓글수정",
  },
  {
    id: 13,
    code: "CHANGE_AUTHORITY",
    value: "권한변경",
  },
];

const Loading = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  width: 60%;
  height: 100%;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  padding: 0%;
  margin-right: 1%;
`;

const NoData = styled.div`
  text-align: center;
  height: 20rem;
  padding-top: 20%;
  font-size: 2rem;
`;

const ProjectListContainer = () => {
  const { projectId } = useParams();
  const [logList, setLogList] = useState([]);
  const [logPageInfo, setLogPageInfo] = useState({
    page: "",
    size: "",
    totalElements: "",
    totalPages: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLogList = async () => {
    const response = await getApi(
      `/projectlog/${projectId}?${queryParams.toString()}`
    );
    return response.data;
  };

  const onFetchLogListSuccess = (data) => {
    console.log('로그 리스트 들고오기 성공 : ');
    console.log(data);
    setLogList(data.data);
    setLogPageInfo(data.pageInfo);
    setIsLoading(false);
  }

 

  useEffect(() => {
    setIsLoading(true);
    console.log("Log 정보를 위해 useEffect에서 데이터 요청함");
    tryFunc(fetchLogList, onFetchLogListSuccess, dispatch)();    
  }, [location, projectId]);

  return (
    <Container>
      <UpperBar
        isPersonal={false}
        codeInformation={codeInformation}
        count={logPageInfo.totalElements}
      />
      {!isLoading && (
        <>
          {logPageInfo.totalElements !== 0 ? (
            <>
              {<ProjectLogList logList={logList} />}
          <Pagination pageInfo={logPageInfo} pageCount={5} isPersonal={false} />
            </>
          ): (
            <NoData>로그가 존재하지 않습니다</NoData>
          )}
        
        </>
      )}
      {isLoading && (
        <Loading>
          <ListLoadingSpinner />;
        </Loading>
      )}
    </Container>
  );
};

export default ProjectListContainer;
