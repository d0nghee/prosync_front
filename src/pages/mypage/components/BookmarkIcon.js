import React from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'



export default function BookmarkIcon(props) {
    const { isBookCheck, style, onClick } = props;

    return (
        <>
            {isBookCheck ? <FaBookmark onClick={onClick} style={style}/> : <FaRegBookmark onClick={onClick} style={style}/>}
        </>
    )
}
