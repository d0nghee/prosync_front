import { React, useState, useEffect, useCallback } from "react";
import { useParams, json } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../../components/notification/SearchBar";
import Pagination from "./../../components/notification/Pagination";
import { getApi } from "../../util/api";
import ProjectLogList from './../../components/notification/ProjectLogList';

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
  color: gray;
  font-weight: 900;
  width: 30rem;
  height: 10rem;
  margin-left: 40%;
  margin-top: 10%;
`;

const Container = styled.div`
  width: 60%;
  height: 100%;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  padding: 0%;
  margin-right: 0%;
`;

const ProjectListContainer = () => {
  const { projectId } = useParams();
  const [searchCondition, setSearchCondition] = useState({
    code: "",
    startDate: "",
    endDate: "",
    content: "",
    size: "",
    page: "",
  });

  const [logList, setLogList] = useState([]);
  const [logPageInfo, setLogPageInfo] = useState({
    page: "",
    size: "",
    totalElements: "",
    totalPages: "",
  });


  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLogList = async () => {
      setIsLoading(true);

      console.log("useEffect에서 데이터 요청함");
      const response = await getApi(
        `/projectlog/${projectId}?logCode=${searchCondition.code}&startDate=${searchCondition.startDate}&endDate=${searchCondition.endDate}&content=${searchCondition.content}&size=${searchCondition.size}&page=${searchCondition.page}`
      );
      console.log(response);
      console.log(response.status);
      if (
        response.response &&
        (response.response.status === 500 || response.response.status === 404)
      ) {
        throw json(
          { status: response.response.status },
          { message: response.response.data.resultCode }
        );
      }

      setLogList(response.data.data);
      setLogPageInfo(response.data.pageInfo);
      setIsLoading(false);
    };

    getLogList();
  }, [searchCondition, projectId]);

  const onConditionChangeHandler = useCallback((postSearchCondition) => {
    setSearchCondition(postSearchCondition);
  }, []);

  return (
    <Container>
      <SearchBar
        onConditionChangeHandler={onConditionChangeHandler}
        isPersonal={false}
        codeInformation={codeInformation}
      ></SearchBar>
      {!isLoading && (
        <>
          {
            <ProjectLogList
              logList={logList}
            ></ProjectLogList>
          }
          <Pagination
            pageInfo={logPageInfo}
            pageCount={5}
            searchCondition={searchCondition}
            onConditionChangeHandler={onConditionChangeHandler}
            isPersonal={false}
          />
        </>
      )}
      {isLoading && (
        <Loading>데이터를 로딩중입니다. 잠시만 기다려주세요.</Loading>
      )}
    </Container>
  );
};

export default ProjectListContainer;
