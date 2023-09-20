// import React from 'react'

// import Button from '../button/Button'
// import { CustomDiv, Lable } from '../../css/MyPageStyle'
// import { useDispatch, useSelector } from 'react-redux'
// import { setMemberInfo, setSelectedComponent } from '../../redux/mypageSlice';
// import axiosInstance from '../../util/axios/axiosInstances';
// import Popup from '../popup/Popup'
// import { setIsConfirmModalOpen, setModalButtons, setModalMessage } from '../../redux/signupSlice';

// export default function MypageDefault() {

//     const mypage = useSelector(state => state.mypage);
//     const popup = useSelector(state => state.signup);
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         dispatch(setMemberInfo({
//             password: e.target.value,
//         }));
//     }

//     const handleCheckPassword = () => {
//         console.log(mypage.memberInfo);
//         axiosInstance.get('/members')
//             .then(async (response) => {
//                 if (mypage.memberInfo === response.data.password) {
//                     console.log('su')
//                     dispatch(setSelectedComponent('InfoEdit'));
//                 } else {
//                     // dispatch(setModalMessage("비밀번호가 맞지 않습니다."));
//                     // dispatch(setModalButtons({
//                     //     lable : '확인',
//                     //     onClick : () => {
//                     //         dispatch(setIsConfirmModalOpen(false));
//                     //     }
//                     // }))
//                     // dispatch(setIsConfirmModalOpen(true));
//                 }
//             }).catch()
//     }

//     return (
//         <>
//             <CustomDiv>
//                 <Lable>비밀번호 입력 : &nbsp;</Lable>
//                 <InputPassword type='password' onChange={handleChange}></InputPassword>
//             </CustomDiv>
//             <CustomDiv>
//                 <Button
//                     backgroundColor='#7B69B7'
//                     width='20%'
//                     label='확인'
//                     color="#FFDAB9"
//                     onClick={handleCheckPassword}
//                 ></Button>
//             </CustomDiv>
//             <Popup isOpen={popup.isConfirmModalOpen} />
//         </>
//     )
// }
