import React from "react";

import {
  FormContainer,
  InputContent,
  LabelContent,
} from "../../css/LoginStyle";
import { One } from "../../css/SignupStyle";

export default function loginForm(props) {
  const { onChange, onEnter } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      onEnter();
    }
  };

  return (
    <FormContainer>
      <One>
        <LabelContent>Email</LabelContent>
        <InputContent
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
          wid="100%"
        />
      </One>
      <One>
        <LabelContent>Password</LabelContent>
        <InputContent
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
          wid="100%"
        />
      </One>
    </FormContainer>
  );
}
