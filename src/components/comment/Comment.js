import { styled } from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { patchCommentApi, deleteCommentApi, postFileApi } from "../../util/api";
import { useParams } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import SimpleFileList from "../file/SimpleFileList";
import { RiAttachment2 } from "react-icons/ri";
import * as t from "../task/form/TaskForm.style";
import SelectedFiles from "../file/SelectedFiles";
import { tryFunc } from "../../util/tryFunc";
import useFormInput from "../../hooks/use-form-input";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import MemberProfile from "../common/MemberProfile";

export default function Comment({ comment, memberId, onRemove }) {
  const [activeComment, setActiveComment] = useState(false);
  const [originalContent, setOriginalContent] = useState(comment.content);
  const params = useParams();
  const [commentFiles, setCommentFiles] = useState(comment.fileList);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    value: commentValue,
    setHandler: commentSetHandler,
    blurHandler: commentBlurHandler,
    hasError: commentHasError,
    isValid: commentIsValid,
  } = useFormInput(
    (value) =>
      value.replace(/<[^>]*>/g, "").trim() !== "" &&
      value.replace(/<[^>]*>/g, "").length <= 300
  );

  const dispatch = useDispatch();

  useEffect(() => {
    commentSetHandler(comment ? comment.content : "");
  }, []);

  const contentUpdateHandler = (event, commentId) => {
    event.preventDefault();
    if (!commentIsValid) {
      alert("댓글은 1 ~ 300자 이내로 작성해주세요.");
      return;
    }

    const fileIds =
      selectedFiles.length !== 0
        ? selectedFiles.map((file) => file.fileId)
        : [];

    tryFunc(
      () =>
        patchCommentApi(params.taskId, commentId, {
          content: commentValue,
          fileIds,
        }),
      () => {
        if (selectedFiles.length !== 0) {
          if (commentFiles && commentFiles.length !== 0) {
            setCommentFiles((prv) => [...prv, ...selectedFiles]);
          } else {
            setCommentFiles([...selectedFiles]);
          }
        }

        setActiveComment(false);
        setSelectedFiles([]);
        setOriginalContent(commentValue);
      },
      dispatch
    )();
  };

  const editHandler = () => {
    setActiveComment(true);
  };

  const cancelHandler = () => {
    setActiveComment(false);
    commentSetHandler(originalContent);
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
        dispatch
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
        dispatch
      )();
    }
  };

  const [memberProfile, setMemberProfile] = useState({ show: false });

  return (
    <>
      <form
        method="patch"
        onSubmit={(event) => contentUpdateHandler(event, comment.commentId)}
      >
        <CommentArea>
          <Details>
            {memberId === comment.memberInfo.memberId && !activeComment ? (
              <>
                {/* 편집 시작*/}
                <AiOutlineEdit onClick={editHandler} size="30px" />
                {/* 삭제 */}
                <AiOutlineDelete
                  size="28px"
                  onClick={() => deleteHandler(comment.commentId)}
                />
              </>
            ) : memberId === comment.memberInfo.memberId && activeComment ? (
              <>
                {/* 파일 등록 */}
                <FileInputContainer>
                  <RiAttachment2 size="27px" />
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
                <GiCancel size="26px" onClick={() => cancelHandler()} />
              </>
            ) : (
              ""
            )}
            <Date>최근 수정: {comment.modifiedAt}</Date>
          </Details>
          <Box edit={activeComment}>
            <SideInfo>
              <div
                onClick={() => {
                  setMemberProfile({ show: true });
                }}
              >
                <img
                  src={comment.memberInfo.profileImage}
                  alt="작성자 이미지"
                />
                {!activeComment && (
                  <Username quitUser={comment.memberInfo.status === "QUIT"}>
                    {comment.memberInfo.name}
                  </Username>
                )}
              </div>
              {!activeComment && commentFiles && commentFiles.length !== 0 && (
                <SimpleFileList
                  files={commentFiles}
                  updateFiles={(files) => setCommentFiles(files)}
                  isAuthenticated={memberId === comment.memberInfo.memberId}
                />
              )}
            </SideInfo>
            {!activeComment ? (
              <Content dangerouslySetInnerHTML={{ __html: commentValue }} />
            ) : (
              <CommentInput
                theme="snow"
                id="comment"
                name="comment"
                placeholder="댓글을 입력하세요."
                onBlur={commentBlurHandler}
                onChange={commentSetHandler}
                isError={commentHasError}
                defaultValue={commentValue}
              />
            )}
          </Box>
        </CommentArea>
      </form>
      {selectedFiles && selectedFiles.length !== 0 && (
        <SelectedFiles
          files={selectedFiles}
          updateFiles={(files) => setSelectedFiles(files)}
        />
      )}
      {memberProfile.show && (
        <MemberProfile
          onClose={() => setMemberProfile({ show: false })}
          memberInformation={{
            isOthers: true,
            memberId: comment.memberInfo.memberId,
            projectId: params.projectId,
          }}
        />
      )}
    </>
  );
}

const CommentInput = styled(ReactQuill)`
  flex: 5;
  height: 120px;

  .ql-editor {
    font-size: 1rem;
    line-height: 1.5;

    a {
      text-decoration: underline;
    }
`;

const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 63px;
      height: 63px;
      border-radius: 5rem;
      border: 1px solid #d6ccc2;
    }
    img:hover {
      border: 2px solid #cdb4db;
    }
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  align-items: flex-start;
`;

const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  max-height: 180px;
  gap: 1rem;

  & > div:first-child {
    flex: ${({ edit }) => (edit ? 0.5 : 1.3)};
    overflow: hidden;
    justify-content: center;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 130px;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: none;
  overflow: auto;
  flex: 5;
  font-size: 1rem;
  outline: none;
  resize: none;
  & > ul {
    list-style: disc;
  }
`;

const Date = styled.div`
  background-color: #ebebeb;
  padding: 5px;
  border-radius: 10px;
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

const Username = styled.div`
  text-decoration: ${({ quitUser }) => (quitUser ? "line-through" : "none")};
`;
