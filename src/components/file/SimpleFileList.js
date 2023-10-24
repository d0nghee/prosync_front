import { styled } from "styled-components";
import { deleteFileApi } from "../../util/api";

import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState } from "react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import FileInfo from "./FileInfo";
import { tryFunc } from "../../util/tryFunc";
import * as t from "../task/form/TaskForm.style";
import { useDispatch } from "react-redux";

export default function SimpleFileList({
  files,
  updateFiles,
  isAuthenticated,
}) {
  const dispatch = useDispatch();

  const [showList, setShowList] = useState(false);
  const deleteHandler = (fileId) => {
    tryFunc(
      async () => await deleteFileApi(fileId),
      (response) => {
        alert("파일 삭제가 완료되었습니다.");
        let newFiles = files;
        newFiles = newFiles.filter((file) => file.fileId !== fileId);
        updateFiles(newFiles);
      },
      dispatch
    )();
  };
  return (
    <>
      {!showList ? (
        <SimpleButton onClick={() => setShowList((prv) => !prv)}>
          <IoDocumentAttachOutline size="18px" />
          <div>{files.length} Files</div>
        </SimpleButton>
      ) : (
        <Box>
          <SimpleButton onClick={() => setShowList((prv) => !prv)}>
            접기
          </SimpleButton>
          <t.BackDrop onClick={() => setShowList(false)} />
          <Wrapper show="true">
            <Files>
              {files.map((file, idx) => (
                <One key={file.fileId}>
                  {isAuthenticated && (
                    <MdOutlineCancelPresentation
                      size="25px"
                      onClick={() => deleteHandler(file.fileId)}
                    />
                  )}
                  <FileInfo
                    file={file}
                    downloadBtn="true"
                    commentFile="true"
                    newFile="true"
                  />
                </One>
              ))}
            </Files>
          </Wrapper>
        </Box>
      )}
    </>
  );
}

const Box = styled.div`
  width: 100%;
`;

const Files = styled.div`
  display: flex;
  border: none;
  flex-direction: column;
  gap: 0.5rem;

  position: absolute;
  background-color: white;
  border: 2px solid #ebebeb;
  border-radius: 1rem;
  z-index: 1;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const One = styled.div`
  display: flex;
  gap: 1rem;
`;

const SimpleButton = styled.div`
  display: flex;
  gap: 0.3rem;
  position: relative;
  font-size: 1rem;
  border-radius: 3rem;
  padding: 5px;
  background-color: #ebebeb;
  justify-content: center;
  width: 100%;
  display: flex;
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  height: 500px;
  width: 100%;
`;
