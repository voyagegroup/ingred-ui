import React, { useState, useRef } from "react";
import * as Styled from "./styled";
import dayjs from "dayjs";

const CalenderInput: React.FC = () => {
  const today = dayjs();
  const [year, setYear] = useState<number>(today.year());
  const [month, setMonth] = useState<number>(today.month() + 1);
  const [date, setDate] = useState<number>(today.date());

  const yearInput = useRef<HTMLInputElement>(null);
  const monthInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  };
  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(Number(event.target.value));
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(Number(event.target.value));
  };

  const handleInputNumberOnly = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.target.value = event.target.value.replace(/[^0-9]+/i, "");
  };

  const handleYearKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "ArrowRight")
      monthInput.current?.focus();
    if (event.key === "ArrowUp") setYear(year + 1);
    if (event.key === "ArrowDown") setYear(year - 1);
  };
  const handleMonthKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === "ArrowRight")
      dateInput.current?.focus();
    if (event.key === "ArrowLeft") yearInput.current?.focus();
    if (event.key === "ArrowUp" && month < 12) setMonth(month + 1);
    if (event.key === "ArrowDown" && month > 1) setMonth(month - 1);
  };
  const handleDateKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowLeft") monthInput.current?.focus();
    if (event.key === "ArrowUp" && date < 31) setDate(date + 1);
    if (event.key === "ArrowDown" && date > 1) setDate(date - 1);
  };

  return (
    <Styled.Container>
      <Styled.Input
        ref={yearInput}
        letterCount={4}
        type={"text"}
        aria-label="Year"
        value={year}
        onChange={handleYearChange}
        onKeyDown={handleYearKeyPress}
        onInput={handleInputNumberOnly}
      />
      /
      <Styled.Input
        ref={monthInput}
        letterCount={2}
        type={"text"}
        aria-label="Month"
        value={("00" + month).slice(-2)}
        onChange={handleMonthChange}
        onKeyDown={handleMonthKeyPress}
        onInput={handleInputNumberOnly}
      />
      /
      <Styled.Input
        ref={dateInput}
        letterCount={2}
        type={"text"}
        aria-label="Date"
        value={("00" + date).slice(-2)}
        onChange={handleDateChange}
        onKeyDown={handleDateKeyPress}
        onInput={handleInputNumberOnly}
      />
    </Styled.Container>
  );
};

export default CalenderInput;
