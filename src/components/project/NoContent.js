import React from 'react';
import styled from 'styled-components';
import noContent from '../../assets/images/nocontent.png';

export default function NoContent({ body }) {
  return (
    <NoContentContainer>
      <img src={noContent} alt="No content available" />
      <p>{body}</p>
    </NoContentContainer>
  );
}

const NoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; // 전체 높이를 차지하도록 설정

  p {
    font-size: 30px;
    color: #666;
  }
`;
