import { styled } from "styled-components";
import Comment from "./Comment";
import { postCommentApi, postFileApi } from "../../util/api";
import { useParams } from "react-router-dom";
import { getCookie } from "../../util/cookies";
import { getCommentsApi } from "../../util/api";
import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import * as t from "../task/form/TaskForm.style";
import SelectedFiles from "../file/SelectedFiles";
import { tryFunc } from "../../util/tryFunc";
import { useNavigate } from "react-router-dom";

export default function CommentList({ projectMember }) {
  const [comments, setComments] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const cookieMemberId = getCookie("memberId");

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const pagesToShow = 5;
  const size = 5;

  const totalPages = comments
    ? Array.from(
        { length: Math.ceil(comments.pageInfo.totalElements / size) },
        (_, index) => index + 1
      )
    : "";

  const generatePages = () => {
    const pages = [];
    for (
      let i = startPage;
      i <= Math.min(totalPages.length, startPage + pagesToShow - 1);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevClick = () => {
    if (startPage > 1) {
      setStartPage(startPage - pagesToShow);
    }
  };

  const handleNextClick = () => {
    if (startPage + pagesToShow <= totalPages.length) {
      setStartPage(startPage + pagesToShow);
    }
  };

  const commonErrror = {
    500: (error) => {
      console.error("Server Error:", error);
      alert("서버에서 오류가 발생했습니다.");
    },
    401: (error) => {
      console.log(error.response.status);
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate(`/auth?mode=login`);
    },
    403: (error) => {
      console.log(error.response.status);
      alert("해당 메뉴에 대한 접근 권한이 없습니다.");
      navigate("/");
    },
  };

  useEffect(() => {
    tryFunc(
      async () =>
        await getCommentsApi(`${params.taskId}`, {
          page: currentPage,
          size,
        }),
      (comments) => setComments(comments),
      commonErrror
    )();
  }, [params.taskId, currentPage]);

  const addComment = (comment) => {
    setComments((prv) => {
      setCurrentPage(1);
      const data = [comment, ...prv.data];
      const pageInfo = {
        ...prv.pageInfo,
        totalElements: prv.pageInfo.totalElements + 1,
      };
      return { data, pageInfo };
    });
  };

  const removeComment = (commentId) => {
    setComments((prv) => {
      const data = prv.data.filter(
        (comment) => comment.commentId !== commentId
      );
      const pageInfo = {
        ...prv.pageInfo,
        totalElements: prv.pageInfo.totalElements - 1,
      };
      return { pageInfo, data };
    });
  };

  const [contentError, setContentError] = useState(false);

  const saveHandler = (event) => {
    event.preventDefault();
    const content = event.target[0].value;

    if (content.trim() === "") {
      setContentError(true);
      return;
    }

    setContentError(false);

    (async () => {
      const fileIds =
        selectedFiles.length !== 0
          ? selectedFiles.map((file) => file.fileId)
          : [];
      const body = {
        content,
        fileIds,
      };

      await tryFunc(
        () => postCommentApi(params.taskId, body),
        (commentId) => {
          setSelectedFiles([]);
          const createdAt = new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
          });
          const memberId = cookieMemberId;
          const profileImage = getCookie("profile");
          const name = getCookie("name");

          addComment({
            commentId,
            content,
            createdAt,
            modifiedAt: createdAt,
            memberInfo: {
              memberId,
              profileImage,
              name,
            },
            fileList: selectedFiles,
          });
          setSelectedFiles([]);
          event.target[0].value = "";
        },
        commonErrror
      )();
    })();
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    const fileList = event.target.files;

    if (fileList && fileList.length !== 0) {
      // api 요청
      tryFunc(
        async () => await postFileApi(fileList),
        (files) => setSelectedFiles((prv) => [...prv, ...files]),
        commonErrror
      )();
    }
  };

  return (
    <>
      {comments && (
        <CommentTotal>
          <CommentTitle>{`${comments.pageInfo.totalElements} Comments`}</CommentTitle>
          {projectMember &&
            projectMember.status === "ACTIVE" &&
            (projectMember.authority === "ADMIN" ||
              projectMember.authority === "WRITER") && (
              <>
                <form method="post" onSubmit={saveHandler}>
                  {/* 댓글 입력 */}
                  {contentError && (
                    <t.ErrorMessage>
                      댓글의 입력값을 다시 확인하세요!
                    </t.ErrorMessage>
                  )}
                  <Save>
                    <textarea type="text" placeholder="댓글을 입력하세요." />
                    <button>등록</button>
                  </Save>

                  {/* 파일 등록 */}
                  <FileInputContainer>
                    <t.StyledButton>파일 등록</t.StyledButton>
                    <t.StyledFileInput
                      type="file"
                      onChange={handleFileChange}
                      multiple
                    />
                  </FileInputContainer>
                </form>
                {/* 선택된 파일들 */}
                {selectedFiles && selectedFiles.length !== 0 && (
                  <SelectedFiles
                    files={selectedFiles}
                    updateFiles={(files) => setSelectedFiles(files)}
                  />
                )}
              </>
            )}
          {comments && comments.data.length !== 0 && (
            <>
              {comments.data.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment.commentId}
                  memberId={cookieMemberId}
                  onRemove={removeComment}
                />
              ))}
              <Page>
                <PageButton
                  onClick={handlePrevClick}
                  disabled={startPage === 1}
                  type="button"
                >
                  <MdNavigateBefore />
                </PageButton>
                {generatePages().map((page) => (
                  <PageButton
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    active={page === currentPage}
                    type="button"
                  >
                    {page}
                  </PageButton>
                ))}
                <PageButton
                  onClick={handleNextClick}
                  disabled={startPage + pagesToShow > totalPages}
                  type="button"
                >
                  <MdNavigateNext />
                </PageButton>
              </Page>
            </>
          )}
        </CommentTotal>
      )}
    </>
  );
}

const Save = styled.div`
  display: flex;
  height: 150px;
  border-radius: 10px;

  button {
    flex: 1;
    padding: 1.3rem;
    font-size: 1rem;
    background-color: #4361ee;
    color: #f1faee;
    border: #dad7cd;
  }

  button:hover {
    opacity: 0.7;
  }

  textarea {
    outline: none;
    font-size: 1.3rem;
    overflow: auto;
    resize: none;
    padding: 1rem;
    flex: 20;
    border: 1px solid #dad7cd;
  }
`;

const CommentTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 70%;
  font-size: 1.2rem;
  margin: 3rem 5%;
`;

const CommentTitle = styled.div`
  font-size: 2rem;
`;

// 페이지네이션
const Page = styled.ul`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem;
`;

const PageButton = styled.button`
  width: 70px;
  padding: 10px 10px;
  font-size: 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: ${(props) => (props.active ? "3px solid #c0c0c0" : "#333")};
  color: #c0c0c0;
  background-color: white;

  &:hover {
    opacity: 0.7;
    background-color: #c0c0c0;
    color: white;
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: bold;
  width: 200px;
  margin-top: 10px;
`;
