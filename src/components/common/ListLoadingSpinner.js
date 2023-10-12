import { MagnifyingGlass } from "react-loader-spinner";
import { styled } from "styled-components";

export default function ListLoadingSpinner() {
  return (
    <Box>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
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
