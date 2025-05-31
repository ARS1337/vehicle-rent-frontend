import React, { useState } from "react";
import Calendar from "react-calendar";
import { eachDayOfInterval, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css"; // for styling blocked days

const MyCalendar = (props) => {
  const { blockedRanges, date, setDate } = props;
  console.log("blockedRanges ",blockedRanges)
  const blockedRanges111 = [
    { start: new Date(2025, 4, 10), end: new Date(2025, 4, 12) },
    { start: new Date(2025, 4, 15), end: new Date(2025, 4, 16) },
  ];

  // Flatten to list of blocked dates
  const disabledDates = (blockedRanges ?? []).flatMap((range) =>
    eachDayOfInterval({ start: range.start, end: range.end })
  );
  return (
    <Calendar
      onChange={setDate}
      value={date}
      selectRange={true}
      tileDisabled={({ date }) => disabledDates.some((disabled) => isSameDay(disabled, date))}
      tileClassName={({ date }) => {
        if (disabledDates.some((disabled) => isSameDay(disabled, date))) {
          return "blocked";
        }
        return null;
      }}
    />
  );
};

export default MyCalendar;
