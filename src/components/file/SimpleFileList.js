import { styled } from "styled-components";
import { deleteFileApi } from "../../util/api";

import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState } from "react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import FileInfo from "./FileInfo";
import { useNavigate } from "react-router-dom";
import { tryFunc } from "../../util/tryFunc";
import * as t from "../task/form/TaskForm.style";

export default function SimpleFileList({
  files,
  updateFiles,
  isAuthenticated,
}) {
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

  const [showList, setShowList] = useState(false);
  const deleteHandler = (fileInfoId) => {
    tryFunc(
      async () => await deleteFileApi(fileInfoId),
      (response) => {
        alert("파일 삭제가 완료되었습니다.");
        let newFiles = files;
        newFiles = newFiles.filter((file) => file.fileInfoId !== fileInfoId);
        updateFiles(newFiles);
      },
      commonErrror
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
                      onClick={() => deleteHandler(file.fileInfoId)}
                    />
                  )}
                  <FileInfo file={file} />
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
  margin-bottom: 1rem;
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
  border: 1px solid #333;
`;

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  height: 500px;
  width: 100%;
`;