import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const LoadingBar = styled.div`
 position: absolute;
  bottom: 0;
  left: 0;
  height: 6px;
  width: 0;
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  transition: width 10s linear; 
`

const ToastContainer = styled.div`
  position: fixed;
  bottom: ${props => props.bottom};
  right: 1rem;
  padding: 2rem 1rem 0rem 1rem;
  color: gray;
  background-color: white;
  z-index: 2000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 25%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  & > div:nth-child(1) {
    display: flex;
    width: 100%;

    & > div:nth-child(1) {
      width: 15%;
      height: 25%;
      font-size: x-large;
    }

    & > div:nth-child(2) {
      cursor: pointer;
      width: 80%;
      font-weight: 900;
    }

    & > div:nth-child(2):hover {
      text-decoration: underline;
    }
  }

  &:hover {
    background-color: #e2e2e2;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    color: black;

  } 
`;

const ToastMessage = ({ data, bottom }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [barWidth, setBarWidth] = useState('0%');




  useEffect(() => {
    let timer1;
    if (isLoading) {
      timer1=setTimeout(() => {
        setBarWidth("100%");
      }, 50);
    }

      const timer2 = setTimeout(() => setIsLoading(false), 10000);
    
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      }
  }, [isLoading]);

  return (
    <ToastContainer onClick={() => navigate("/notification")} bottom={bottom}>
      <div>
        <div>📬</div>
        <div
          onClick={(e) => {
            e.stopPropagation();

            if (data.isCountMessage) {
              navigate("/notification");
              return;
            }
            navigate(data.url);
          }}
        >
          {data.content}
        </div>
      </div>
      {isLoading && <LoadingBar style={{width: barWidth}}/>}
    </ToastContainer>
  );
};

export default ToastMessage;
