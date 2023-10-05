import { ThreeDots } from "react-loader-spinner";
import { styled } from "styled-components";

export default function LoadingSpinner() {
  return (
    <Box>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  height: 30rem;
  padding: 20rem;
`;
