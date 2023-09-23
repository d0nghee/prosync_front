import React from 'react'
import { styled } from 'styled-components';

const StylePreview = styled.div`
    border: 1px solid black;
    width: 60%;
    height: 50rem;
    font-size: xx-large;
    font-weight: 900;
    display : flex;
    align-items: center;
    justify-content: center;
    margin-left: 5%;
`;

const ProjectLogPreview = () => {
  return (
    <StylePreview>프로젝트 로그 목록 조회</StylePreview>
  )
}

export default ProjectLogPreview