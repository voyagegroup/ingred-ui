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

  const handleOnChange =
    (datePart: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (datePart === "year") setYear(Number(event.target.value));
      if (datePart === "month") setMonth(Number(event.target.value));
      if (datePart === "date") setDate(Number(event.target.value));
    };

  const handleOnKeyPress =
    (datePart: string) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === "ArrowRight") {
        if (datePart === "year") {
          if (!yearInput.current || !yearInput.current.selectionStart) return;
          if (yearInput.current.selectionStart === 4)
            monthInput.current?.focus();
        }
        if (datePart === "month") {
          if (!monthInput.current || !monthInput.current.selectionStart) return;
          if (monthInput.current.selectionStart === 2)
            dateInput.current?.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        if (datePart === "month") {
          if (!monthInput.current || !monthInput.current.selectionStart) return;
          if (monthInput.current.selectionStart === 1)
            yearInput.current?.focus();
        }
        if (datePart === "date") {
          if (!dateInput.current || !dateInput.current.selectionStart) return;
          if (dateInput.current.selectionStart === 1)
            monthInput.current?.focus();
        }
      }
      if (event.key === "ArrowUp") {
        if (datePart === "year") setYear(year + 1);
        if (datePart === "month" && month < 12) setMonth(month + 1);
        if (datePart === "date" && date < 31) setDate(date + 1);
      }

      if (event.key === "ArrowDown") {
        if (datePart === "year") setYear(year - 1);
        if (datePart === "month" && month > 1) setMonth(month - 1);
        if (datePart === "date" && date > 1) setDate(date - 1);
      }
    };

  const handleInputNumberOnly = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.target.value = event.target.value.replace(/[^0-9]+/i, "");
  };

  return (
    <Styled.Container>
      <Styled.Input
        ref={yearInput}
        letterCount={4}
        type={"text"}
        aria-label="Year"
        value={year}
        onChange={handleOnChange("year")}
        onKeyDown={handleOnKeyPress("year")}
        onInput={handleInputNumberOnly}
      />
      /
      <Styled.Input
        ref={monthInput}
        letterCount={2}
        type={"text"}
        aria-label="Month"
        value={("00" + month).slice(-2)}
        onChange={handleOnChange("month")}
        onKeyDown={handleOnKeyPress("month")}
        onInput={handleInputNumberOnly}
      />
      /
      <Styled.Input
        ref={dateInput}
        letterCount={2}
        type={"text"}
        aria-label="Date"
        value={("00" + date).slice(-2)}
        onChange={handleOnChange("date")}
        onKeyDown={handleOnKeyPress("date")}
        onInput={handleInputNumberOnly}
      />
    </Styled.Container>
  );
};

export default CalenderInput;
