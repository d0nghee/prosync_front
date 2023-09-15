import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'


export default function ProfileImage(props) {

    const { profileimage } = props;

    const dispatch = useDispatch();
    const mypage = useSelector(state => state.mypage);

    

    return (
        <input type>
            <FaUser size='90'></FaUser>
        </input>
    )
}
