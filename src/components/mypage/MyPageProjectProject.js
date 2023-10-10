import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import BookMarkOn from '../../assets/images/bookmark-on.png';
import BookMarkOff from '../../assets/images/bookmark-off.png'
import { BookmarkWrapper, ProjectTitle, ProjectImage, PostDescription, PostName, PostsDate } from '../../css/MyPageStyle';
import styled from 'styled-components';
import { postApi } from '../../util/api';

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  font-size: 18px; // 글꼴 크기 감소
`;

const StarImage = styled.img`
  width: 20px;
  height: 20px;
`;

export default function MyPageProjectProject({
    projects: {
        title = '',
        startDate = '',
        endDate = '',
        projectImage = '',
        projectId = '',
        name = '',
        bookmarkId = '',
    } = {},
    onBookmarkChange,
}) {


    const [isBook, setIsBook] = useState(false);
    const navi = useNavigate();

    const handleBookMark = (e) => {
        console.log(e)
        tryFunc(subscribeHandler)();
    };

    const subscribeHandler = () => {
        postApi(`/bookmark/${projectId}`).then(() => {
            setIsBook(!isBook);
            onBookmarkChange();
        })
    }

    useEffect(() => {
        if (bookmarkId) {
            setIsBook(true);
        }
    }, [bookmarkId]);

    const clickHandler = () => {
        navi(`/projects/${projectId}`)
    }

    return (
        <>
            <BookmarkWrapper>
                <StarButton
                    onClick={handleBookMark}>
                    <StarImage
                        src={isBook ? BookMarkOn : BookMarkOff} alt="Star"
                    />
                </StarButton>
                <ProjectTitle
                    onClick={clickHandler}
                >
                    {title}
                </ProjectTitle>
            </BookmarkWrapper>
            <ProjectImage
                src={projectImage}
                onClick={clickHandler}>
            </ProjectImage>
            <PostDescription>
                <PostName>
                    {name}
                </PostName>
            </PostDescription>
            <PostDescription>

                <PostsDate>
                    {startDate} to {endDate}
                </PostsDate>

            </PostDescription>
        </>
    )
}
