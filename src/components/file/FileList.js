import FileInfo from "./FileInfo";
import { styled } from "styled-components";
import { deleteFileApi } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";

export default function FileList({ fileList, deleteFile, projectMember }) {
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

  const deleteHandler = (fileInfoId) => {
    tryFunc(
      async () => await deleteFileApi(fileInfoId),
      (response) => deleteFile(fileInfoId),
      commonErrror
    )();
  };
  return (
    <List>
      {fileList &&
        fileList.length !== 0 &&
        fileList.map((file) => (
          <Item key={file.fileId}>
            <FileInfo file={file} />
            {projectMember &&
              (projectMember.authority === "ADMIN" ||
                projectMember.authority === "WRITER") && (
                <button
                  type="button"
                  onClick={() => deleteHandler(file.fileInfoId)}
                >
                  삭제
                </button>
              )}
          </Item>
        ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  max-height: 200px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #a19b9b;

  button {
    background-color: white;
    border: 1px solid red;
    color: red;
  }
`;
