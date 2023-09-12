import React from "react";

export default function Button({ buttonName, type }) {
  return (
    <>
      <button type={type}>
        <span>{buttonName}</span>
      </button>
    </>
  );
}
