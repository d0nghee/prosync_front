import React from "react";
import { useState } from "react";

export default function useFormInput(foo) {
  const [value, setValue] = useState("");
  const [touch, setTouch] = useState(false);

  let isValid = foo(value);
  const hasError = !isValid && touch;

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const setHandler = (value) => {
    setValue(value);
  };

  const blurHandler = (e) => {
    setTouch(true);
  };

  const reset = () => {
    setValue("");
    setTouch(false);
  };

  return {
    value,
    isValid,
    changeHandler,
    setHandler,
    blurHandler,
    reset,
    hasError,
  };
}
