import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { tryFunc } from '../../util/tryFunc';
import { PostDescription, PostsDate, ProjectImage, ProjectTitle } from '../../css/MyPageStyle';
import BookMarkOn from '../../assets/images/bookmark-on.png'
import BookMarkOff from '../../assets/images/bookmark-off.png'
import styled from 'styled-components';


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

const Container = styled.div`
    background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  margin: 4px;
  border: 1px solid white;
  &:hover {
    border: 1px solid #333;
  }
`

const BookmarkWrapper = styled.header`
    display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5d5d5; // 더 부드러운 색상의 경계선
  padding-bottom: 8px;
  border: 1px solid grey;
  padding: 10px;
  background-color: #fffff7;
`
const ProjectTitle = styled.h1`
    font-size: 15px; // 글꼴 크기 감소
    cursor: pointer;
  margin: 0;
`

const ProjectImage = styled.div`
    background-color: black;
  height: 160px;

  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  cursor: pointer;
`

const ImageContent = styled.img`
    width: 100%;
  height: 100%;
  border: 1px solid gray;
  object-fit: cover;
`

const Footer = styled.footer`
    display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-top: 1px solid #f5d5d5; // 더 부드러운 색상의 경계선
  padding-top: 8px;
  height: 50px;
`
const Dates = styled.div`
    font-size: 12px;
`

const Author = styled.div`
    font-size: 12px;
`
export default function BookMarkProjects({
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

    const handleBookmark = (e) => {
        tryFunc(subscribeHandler)();
    }

    const subscribeHandler = () => {
        postApi(`/bookmark/${projectId}`).then(() => {
            setIsBook(!isBook);
            onBookmarkChange();
        }).catch((res) => {
            if (res.code === "ERR_BAD_REQUEST") {
                alert("잘못된 요청입니다.")
            }
        })
    }

    useEffect(() => {
        if (bookmarkId) {
            setIsBook(true)
        }
    }, [bookmarkId])

    const clickHandler = () => {
        navi(`/projects/${projectId}`)
    }


    return (
        <Container>
            <BookmarkWrapper>
                <ProjectTitle
                    onClick={clickHandler}
                >
                    {title}
                </ProjectTitle>
                <StarButton
                    onClick={handleBookmark}
                >
                    <StarImage
                        src={isBook ? BookMarkOn : BookMarkOff} alt='Star'
                    />
                </StarButton>
            </BookmarkWrapper>
            
        </Container>
    )
}
