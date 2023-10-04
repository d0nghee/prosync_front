import { styled } from "styled-components";
import ProfileCard from "../common/ProfileCard";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useRef, useState } from "react";
import { deleteCommentApi, patchCommentApi, postFileApi } from "../../util/api";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import SimpleFileList from "../file/SimpleFileList";
import { RiAttachment2 } from "react-icons/ri";
import * as t from "../task/form/TaskForm.style";
import SelectedFiles from "../file/SelectedFiles";
import { tryFunc } from "../../util/tryFunc";

export default function Comment({ comment, memberId, onRemove }) {
  const navigate = useNavigate();
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

  const [activeCommentId, setActiveCommentId] = useState(false);
  const contentRef = useRef();
  const [originalContent, setOriginalContent] = useState(comment.content);
  const params = useParams();
  const [commentFiles, setCommentFiles] = useState(comment.fileList);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const contentUpdateHandler = (event, commentId) => {
    event.preventDefault();
    const content = event.target[2].value;

    const fileIds =
      selectedFiles.length !== 0
        ? selectedFiles.map((file) => file.fileId)
        : [];

    tryFunc(
      () => patchCommentApi(params.taskId, commentId, { content, fileIds }),
      () => {
        if (selectedFiles.length !== 0) {
          if (commentFiles && commentFiles.length !== 0) {
            setCommentFiles((prv) => [...prv, ...selectedFiles]);
          } else {
            setCommentFiles([...selectedFiles]);
          }
        }

        setOriginalContent(content);
        setActiveCommentId(null);
        setSelectedFiles([]);
      },
      commonErrror
    )();
  };

  const editHanlder = (commentId) => {
    setActiveCommentId(commentId);
  };

  const cancelHandler = () => {
    setActiveCommentId(null);
    contentRef.current.value = originalContent;
  };

  const deleteHandler = async (commentId) => {
    const proceed = window.confirm("정말 삭제하시겠습니까?");
    if (proceed) {
      await tryFunc(
        () => deleteCommentApi(params.taskId, commentId),
        () => {
          onRemove(commentId);
          window.alert("삭제가 완료되었습니다.");
        },
        commonErrror
      )();
    }
  };

  // 댓글 파일
  const handleFileChange = (event) => {
    const fileList = event.target.files;

    if (fileList && fileList.length !== 0) {
      // api 요청
      tryFunc(
        async () => await postFileApi(fileList),
        (files) => setSelectedFiles(files),
        commonErrror
      )();
    }
  };
  return (
    <>
      <form
        method="patch"
        onSubmit={(event) => contentUpdateHandler(event, comment.commentId)}
      >
        <CommentArea>
          <Details>
            {memberId === comment.memberInfo.memberId &&
            activeCommentId !== comment.commentId ? (
              <>
                {/* 편집 시작*/}
                <AiOutlineEdit
                  onClick={() => editHanlder(comment.commentId)}
                  size="30px"
                />
                {/* 삭제 */}
                <AiOutlineDelete
                  size="28px"
                  onClick={() => deleteHandler(comment.commentId)}
                />
              </>
            ) : memberId === comment.memberInfo.memberId &&
              activeCommentId === comment.commentId ? (
              <>
                {/* 파일 등록 */}
                <FileInputContainer>
                  <RiAttachment2 size="28px" />
                  <t.StyledFileInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                  />
                </FileInputContainer>
                {/* 수정 완료 */}
                <PatchButton>
                  <BsCheckCircleFill size="24px" />
                </PatchButton>
                {/* 취소 */}
                <GiCancel size="25px" onClick={() => cancelHandler()} />
              </>
            ) : (
              ""
            )}
            <Date>최근 수정: {comment.modifiedAt}</Date>
          </Details>
          <Box>
            <SideInfo>
              <ProfileCard
                image={comment.memberInfo.profileImage}
                name={comment.memberInfo.name}
              />
              {commentFiles && commentFiles.length !== 0 && (
                <SimpleFileList
                  files={commentFiles}
                  updateFiles={(files) => setCommentFiles(files)}
                  isAuthenticated={memberId === comment.memberInfo.memberId}
                />
              )}
            </SideInfo>
            <Content
              defaultValue={originalContent}
              disabled={activeCommentId !== comment.commentId}
              ref={contentRef}
            />
          </Box>
        </CommentArea>
      </form>
      {selectedFiles && selectedFiles.length !== 0 && (
        <SelectedFiles
          files={selectedFiles}
          updateFiles={(files) => setSelectedFiles(files)}
        />
      )}
    </>
  );
}

const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  align-items: center:
`;

const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  max-height: 100px;
  gap: 1rem;

  & > div:first-child {
    flex: 1.3;
    overflow: hidden;
    justify-content: center;
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: none;
  overflow: auto;
  flex: 5;
  font-size: 1rem;
  outline: none;
  resize: none;
`;

const Date = styled.div`
  background-color: #ebebeb;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #333;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const PatchButton = styled.button`
  background-color: white;
  border: none;
`;

const FileInputContainer = styled.div`
  position: relative;
`;
