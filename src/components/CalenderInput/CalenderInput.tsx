import React, { useState, useRef } from "react";
import * as Styled from "./styled";
import dayjs from "dayjs";

const CalenderInput: React.FC = () => {
  const today = dayjs();
  const [year, setYear] = useState<number>(today.year());
  const [month, setMonth] = useState<number>(today.month() + 1);
  const [date, setDate] = useState<number>(today.date());
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isError] = useState<boolean>(false);
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

  const handleOnFocus = () => {
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    if (
      yearInput.current !== document.activeElement &&
      monthInput.current !== document.activeElement &&
      dateInput.current !== document.activeElement
    ) {
      setIsFocused(false);
    }
  };

  return (
    <Styled.Container isFocused={isFocused} isError={isError}>
      <Styled.Input
        ref={yearInput}
        isError={isError}
        letterCount={4}
        type={"text"}
        aria-label="Year"
        value={year}
        onChange={handleOnChange("year")}
        onKeyDown={handleOnKeyPress("year")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      /
      <Styled.Input
        ref={monthInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="Month"
        value={("00" + month).slice(-2)}
        onChange={handleOnChange("month")}
        onKeyDown={handleOnKeyPress("month")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      /
      <Styled.Input
        ref={dateInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="Date"
        value={("00" + date).slice(-2)}
        onChange={handleOnChange("date")}
        onKeyDown={handleOnKeyPress("date")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </Styled.Container>
  );
};

export default CalenderInput;
