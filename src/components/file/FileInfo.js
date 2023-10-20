import { styled } from "styled-components";
import axios from "axios";

export default function FileInfo({ file, downloadBtn, commentFile }) {
  const handleDownload = () => {
    const s3Url = file.path;

    axios({
      url: s3Url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        commentFile
          ? file.fileName.substring(0, file.fileName.lastIndexOf("_"))
          : file.fileName
      );
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Info downbtn={downloadBtn}>
      <a
        href={file.path}
        download={
          commentFile
            ? file.fileName.substring(0, file.fileName.lastIndexOf("_"))
            : file.fileName
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          {commentFile
            ? file.fileName.substring(0, file.fileName.lastIndexOf("_"))
            : file.fileName}
          ({(file.size / 1024).toFixed(2)}KB)
        </div>
      </a>
      {downloadBtn && (
        <Down type="button" onClick={handleDownload}>
          다운로드
        </Down>
      )}
    </Info>
  );
}

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  width: ${(props) => (props.downbtn ? "100%" : "80%")};
  gap: 1rem;
`;

const Down = styled.button`
  background-color: white;
  border: 1px solid red;
  color: red;
  font-size: 1rem;
`;
