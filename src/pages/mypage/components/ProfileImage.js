import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'


export default function ProfileImage(props) {

    const { profileimage } = props;

    const dispatch = useDispatch();
    const mypage = useSelector(state => state.mypage);



    return (
        <img src='https://prosync-image.s3.ap-northeast-2.amazonaws.com/basic_user_image.png'>

        </img>
    )
}
