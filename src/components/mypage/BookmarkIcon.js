import React, { useEffect } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import BookmarkOn from '../../assets/images/bookmark-on.png'
import BookmarkOff from '../../assets/images/bookmark-off.png'
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
`

const StarImage = styled.img`
    width : 20px;
    height: 20px;
`

export default function BookmarkIcon(props) {
    const { isBookCheck, style, onClick } = props;

    return (
        <>
        <StarButton onClick={onClick}>
            <StarImage
                src={isBookCheck ? BookmarkOff : BookmarkOn} alt='Star'
            />
        </StarButton>
        </>
    )
}
