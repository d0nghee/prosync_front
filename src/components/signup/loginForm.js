import React from 'react'

import { FormContainer, InputContent, LabelContent } from '../../css/LoginStyle'

export default function loginForm(props) {

  const { onChange, onEnter } = props;

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    onChange(name, value);
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e.key)
      onEnter();
    }
  }

  return (
    <FormContainer>
        <LabelContent>Mail</LabelContent>
        <InputContent type='email' name='email' id='email' onChange={handleInputChange} onKeyPress={onKeyPress} style={{marginBottom: "20px"}}/>
        <LabelContent>Password</LabelContent>
        <InputContent type='password' name='password' id='password' onChange={handleInputChange} onKeyPress={onKeyPress} />
    </FormContainer>
  )
}

