import React from "react";
import classes from "./Button.module.css";

export default function Button({ buttonName, type}) {
  return (
    <>
      <button className={classes.button} type={type}>
        <span>{buttonName}</span>
      </button>
    </>
  );
}
