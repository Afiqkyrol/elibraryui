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

  useEffect(() => {
    // if (excludeDates) {
    //   for (let i = 0; i < excludeDates.length; i++) {
    //     const { endDate } = excludeDates[i];
    //     const { startDate } = excludeDates[i + 1];

    //     console.log(startDate - endDate);
    //   }
    // }

    console.log(excludeDates);
  }, [excludeDates]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (startDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

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
    <div style={{ paddingLeft: "30px" }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        excludeDates={disabledDates}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default MyDatePicker;
