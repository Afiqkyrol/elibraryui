"use client";

import { fetchMinDate } from "@/api/patron/getApi";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [excludeDates, setExcludeDates] = useState(null);

  useEffect(() => {
    async function getDate() {
      setExcludeDates(await fetchMinDate(44));
    }

    getDate();
  }, []);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
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

  // Generate disabled dates for each range
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
      selected={selectedDate}
      onChange={handleDateChange}
      excludeDates={disabledDates}
      dateFormat="yyyy-MM-dd" // Customize date format if needed
    />
  );
};

export default MyDatePicker;
