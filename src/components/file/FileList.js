import FileInfo from "./FileInfo";
import { styled } from "styled-components";
import { deleteFileApi } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import { useDispatch } from "react-redux";

export default function FileList({
  fileList,
  deleteFile,
  projectMember,
  deleteButton,
}) {
  const dispatch = useDispatch();
  const deleteHandler = (fileInfoId) => {
    const proceed = window.confirm("파일을 삭제하시겠습니까?");
    if (proceed) {
      tryFunc(
        async () => await deleteFileApi(fileInfoId),
        (response) => {
          deleteFile(fileInfoId);
          alert("삭제가 완료되었습니다.");
        },
        dispatch
      )();
    }
  };
  return (
    <List>
      {fileList &&
        fileList.length !== 0 &&
        fileList.map((file) => (
          <Item key={file.fileId}>
            <FileInfo file={file} />
            {deleteButton && (
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
  font-size: 1.2rem;
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
    font-size: 1.2rem;
  }
`;
