import React from 'react'

import { FormContainer, InputContent, LabelContent } from '../../css/LoginStyle'

export default function loginForm(props) {

  const { onChange } = props;

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    onChange(name, value);
  }

  return (
    <FormContainer>
        <LabelContent>Mail</LabelContent>
        <InputContent type='email' name='email' id='email' onChange={handleInputChange} />
        <LabelContent>Password</LabelContent>
        <InputContent type='password' name='password' id='password' onChange={handleInputChange} />
    </FormContainer>
  )
}
