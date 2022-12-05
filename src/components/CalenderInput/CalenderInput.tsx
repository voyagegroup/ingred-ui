import React, { useState } from "react";
import * as Styled from "./styled";
import dayjs from "dayjs";

const CalenderInput: React.FC = () => {
  const today = dayjs();
  const [year, setYear] = useState<number>(today.year());
  const [month, setMonth] = useState<number>(today.month() + 1);
  const [date, setDate] = useState<number>(today.date());

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(Number(e.target.value));
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(Number(e.target.value));
  };

  return (
    <Styled.Container>
      <Styled.Input
        letterCount={4}
        type={"text"}
        aria-label="Year"
        value={year}
        onChange={handleYearChange}
      />
      /
      <Styled.Input
        letterCount={2}
        type={"text"}
        aria-label="Month"
        value={("00" + month).slice(-2)}
        onChange={handleMonthChange}
      />
      /
      <Styled.Input
        letterCount={2}
        type={"text"}
        aria-label="Date"
        value={("00" + date).slice(-2)}
        onChange={handleDateChange}
      />
    </Styled.Container>
  );
};

export default CalenderInput;
