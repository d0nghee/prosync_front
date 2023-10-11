import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import BookMarkOn from '../../assets/images/bookmark-on.png';
import BookMarkOff from '../../assets/images/bookmark-off.png'
import { BookmarkWrapper, ProjectTitle, ProjectImage, PostDescription, PostName, PostsDate } from '../../css/MyPageStyle';
import styled from 'styled-components';
import { postApi } from '../../util/api';

const StarButton = styled.button`

  width: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px; // 글꼴 크기 감소
  margin-right: 10px;
  margin-bottom: 7px;
`;

const StarImage = styled.img`
  width: 20px;
  height: 20px;
`;

export default function MyPageProjectProject({
    projects: {
        title = '',
        createdAt = '',
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
        }).catch((res) => {
            if (res.code === "ERR_BAD_REQUEST") {
                alert("잘못된 요청입니다.");
            }
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
                    관리자 : {name}
                </PostName>
            </PostDescription>
            <PostDescription>

                <PostsDate>
                    생성일 : {createdAt}
                </PostsDate>

            </PostDescription>
            <PostDescription>

                <PostsDate>
                    시작일 : {startDate}
                </PostsDate>

            </PostDescription>
            <PostDescription>

                <PostsDate>
                    종료일 : {endDate}
                </PostsDate>

            </PostDescription>

        </>
    )
}
