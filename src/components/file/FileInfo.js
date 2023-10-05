import { styled } from "styled-components";

export default function FileInfo({ file }) {
  return (
    <Info>
      <a href={file.path} download={file.fileNmae}>
        {file.fileNmae}
        <div>
          {file.fileName} ({file.size}KB)
        </div>
      </a>
    </Info>
  );
}

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;
