import React from "react";
import classes from "./Button.module.css";

export default function Button({ buttonName }) {
  return (
    <>
      <button className={classes.button}>
        <span>{buttonName}</span>
      </button>
    </>
  );
}
