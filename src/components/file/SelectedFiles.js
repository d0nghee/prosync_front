import { styled } from "styled-components";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function SelectedFiles({ files, updateFiles }) {
  // 백엔드 API 요청 X (백엔드에서 주기적으로 삭제 처리)
  const deleteHandler = (fileId) => {
    let newFiles = files;
    newFiles = newFiles.filter((file) => file.fileId !== fileId);
    updateFiles(newFiles);
  };
  return (
    <Files>
      {files.map((file) => (
        <One key={file.fileId}>
          <div>
            <MdOutlineCancelPresentation
              size="25px"
              onClick={() => deleteHandler(file.fileId)}
            />
          </div>
          <div>{file.path}</div>
        </One>
      ))}
    </Files>
  );
}

const Files = styled.div`
  width: 100%;
  border-radius: 2rem;
  margin: 1rem 0;
  color: #50a14f;
`;

const One = styled.div`
  display: flex;
  overflow: auto;
  gap: 1rem;
`;
