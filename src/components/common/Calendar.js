import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar({ changeDate }) {
  return (
    <>
      <Calendar
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        selectRange={true}
        onChange={changeDate}
      />
    </>
  );
}

export default MyCalendar;
