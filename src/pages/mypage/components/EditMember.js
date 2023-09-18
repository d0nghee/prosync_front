import React from 'react'
import Button from '../../../components/button/Button'
import Popup from '../../../components/popup/Popup'
import ProfileImage from './ProfileImage'
import { CustomDiv, Label, InputText, InputTextArea } from '../../../css/MyPageStyle'
import { useDispatch, useSelector } from 'react-redux'
import { setMemberInfo } from '../../../redux/reducers/mypageSlice'

export default function EditMember() {

  const dispatch = useDispatch();
  const mypage = useSelector(state => state.mypage);


  console.log('mypage2 :' + mypage.selectedComponent);
  const handleChange = (e) => {
    dispatch(setMemberInfo({
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
      [e.target.name] : e.target.value,
    }));

  }

  const handleFileChange = (e) => {
    
  }


  return (
    <>
      <CustomDiv style={{ justifyContent: 'left', marginLeft: '100px' }}>
        <div style={{ border: 'solid black 5px', padding: '2rem', borderRadius: '10rem' }}>
          <ProfileImage ></ProfileImage>
        </div>
        <div style={{ justifyContent: 'center', width: '100%', marginTop: '30px', marginLeft: '5rem' }}>
          <Button
            label='이미지 변경'
            width='10%'
            backgroundColor='#7B69B7'
            onClick={handleFileChange}
          ></Button>
        </div>
      </CustomDiv>
      <CustomDiv>
        <Label>이름 입력 : &nbsp;</Label>
        <InputText type='text' name='name' id='name' onChange={ handleChange } />
      </CustomDiv>
      <CustomDiv>
        <Label>소개글 입력 :&nbsp;</Label>
        <InputTextArea name='intro' id='intro' onChange={ handleChange } />
      </CustomDiv>
      <CustomDiv style={{ justifyContent: 'center' }}>
        <Button
          backgroundColor='#7B69B7'
          width='20%'
          label='수정'
          color="#FFDAB9"
        ></Button>
        <Button
          backgroundColor='#7B69B7'
          width='20%'
          label='취소'
          color="#FFDAB9"
        ></Button>
      </CustomDiv>
      <Popup />
    </>
  )
}