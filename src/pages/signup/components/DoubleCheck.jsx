import React from "react";

export default function DoubleCheck(props) {


    const { First, Second } = props;
  
    const check = () => {
      if (First === '' || Second === '') {
        return null;
      } else if (First === Second) {
        return (
          <p style={{ color: "green", marginLeft : '2rem' }}>
            일치함
          </p>
        );
      } else {
        return (
          <p style={{ color : 'red', marginLeft : '2rem' }}>
            불일치
          </p>
        );
      }
    };
  
    return (
      <div>
        {check()}
      </div>
    );
  }