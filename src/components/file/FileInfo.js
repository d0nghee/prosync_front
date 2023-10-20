import { styled } from "styled-components";

export default function FileInfo({ file }) {
  return (
    <Info>
      <a
        href={file.path}
        download={file.fileName}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          {file.fileName} ({(file.size / 1024).toFixed(2)}KB)
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

