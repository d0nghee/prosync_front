import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const CustomCalendar = ({ onChange, value }) => {
  const [nowDate, setNowDate] = useState("날짜"); // nowDate라는 상태를 만들어서 기본값으로 날짜를 주고
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
    setIsOpen(false);
    setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일")); // 날짜가 선택될 때에 NowDate 값을 넣어주도록 수정
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handleToggleCalendar}>{nowDate}</DropdownButton>{" "}
      // 드롭다운에 nowDate를 넣음
      <CalendarWrapper isOpen={isOpen}>
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default CustomCalendar;

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 200px;
  height: 48px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;
