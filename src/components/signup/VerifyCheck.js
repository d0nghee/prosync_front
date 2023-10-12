import React from "react";
import styled from "styled-components";

const VerifyCheck = ({ isVerifyCodeButtonVisible }) => {
  return <>{isVerifyCodeButtonVisible ? <Pass>통과</Pass> : null}</>;
};

export default VerifyCheck;

export const Pass = styled.div`
  width: 100px;
  text-align: center;
  font-weight: bold;
  color: green;
  font-size: 1.1rem;
`;
