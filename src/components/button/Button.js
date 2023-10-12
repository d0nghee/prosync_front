import React from "react";


function Button(props) {
  const { fontSize, marginTop, disabled, onClick, label, color, backgroundColor, width, height, margin } = props;

  const buttonStyle = {
    width : width || '30%', //'30%',
    height : height || '2.5rem', //'2.5rem'
    margin : margin || '1.5rem',
    backgroundColor : backgroundColor || 'red',
    color : '#fff',
    border : color || 'none',
    cursor : 'pointer',
    transition : 'background-color 0.3s ease',
    borderRadius : '3px',
    fontSize : fontSize || '15px',
    marginTop : marginTop || '0px',
  }

 

  return (
   <button onClick={onClick} style={buttonStyle} disabled={disabled}>
    {label}
   </button>
  );
}

export default Button;
