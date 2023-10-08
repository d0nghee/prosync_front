import React, { useEffect } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'



export default function BookmarkIcon(props) {
    const { isBookCheck, style, onClick } = props;

    return (
        <>
            {isBookCheck ? 
            (<FaRegBookmark onClick={onClick} style={style}/>) 
            :
             (<FaBookmark onClick={onClick} style={style}/>)}
        </>
    )
}
