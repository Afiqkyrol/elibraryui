"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerExcDate = ({
  excludeDates,
  style,
  dateChangeHandler,
  selectedDate,
}) => {
  // Function to handle date change
  const handleDateChange = (date) => {
    dateChangeHandler(new Date(date));
  };

  // Function to generate dates within a range
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Array to store all disabled dates
  let disabledDates = [];

  if (excludeDates) {
    excludeDates.forEach((range) => {
      const { startDate, endDate } = range;
      disabledDates = [
        ...disabledDates,
        ...getDatesInRange(
          new Date(String(startDate).substring(0, 10)),
          new Date(String(endDate).substring(0, 10))
        ),
      ];
    });
  }

  return (
    <DatePicker
      required
      className={style}
      selected={selectedDate}
      onChange={handleDateChange}
      excludeDates={disabledDates}
      dateFormat="yyyy-MM-dd" // Customize date format if needed
    />
  );
};

export default DatePickerExcDate;
