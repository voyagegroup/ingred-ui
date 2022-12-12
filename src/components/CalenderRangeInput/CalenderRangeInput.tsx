import React, { useState, useRef } from "react";
import * as Styled from "./styled";
import dayjs from "dayjs";

const CalenderRangeInput: React.FC = () => {
  const today = dayjs();
  const [startYear, setStartYear] = useState<number>(today.year());
  const [startMonth, setStartMonth] = useState<number>(today.month() + 1);
  const [startDate, setStartDate] = useState<number>(today.date());
  const [endYear, setEndYear] = useState<number>(today.year());
  const [endMonth, setEndMonth] = useState<number>(today.month() + 1);
  const [endDate, setEndDate] = useState<number>(today.date());
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isError] = useState<boolean>(false);
  const startYearInput = useRef<HTMLInputElement>(null);
  const startMonthInput = useRef<HTMLInputElement>(null);
  const startDateInput = useRef<HTMLInputElement>(null);
  const endYearInput = useRef<HTMLInputElement>(null);
  const endMonthInput = useRef<HTMLInputElement>(null);
  const endDateInput = useRef<HTMLInputElement>(null);

  const handleOnChange =
    (datePart: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (datePart === "startYear") setStartYear(Number(event.target.value));
      if (datePart === "startMonth") setStartMonth(Number(event.target.value));
      if (datePart === "startDate") setStartDate(Number(event.target.value));
      if (datePart === "endYear") setEndYear(Number(event.target.value));
      if (datePart === "endMonth") setEndMonth(Number(event.target.value));
      if (datePart === "endDate") setEndDate(Number(event.target.value));
    };

  const handleOnKeyPress =
    (datePart: string) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === "ArrowRight") {
        if (datePart === "startYear") {
          if (!startYearInput.current || !startYearInput.current.selectionStart)
            return;
          if (startYearInput.current.selectionStart === 4)
            startMonthInput.current?.focus();
        }
        if (datePart === "startMonth") {
          if (
            !startMonthInput.current ||
            !startMonthInput.current.selectionStart
          )
            return;
          if (startMonthInput.current.selectionStart === 2)
            startDateInput.current?.focus();
        }
        if (datePart === "startDate") {
          if (!startDateInput.current || !startDateInput.current.selectionStart)
            return;
          if (startDateInput.current.selectionStart === 2)
            endYearInput.current?.focus();
        }
        if (datePart === "endYear") {
          if (!endYearInput.current || !endYearInput.current.selectionStart)
            return;
          if (endYearInput.current.selectionStart === 4)
            endMonthInput.current?.focus();
        }
        if (datePart === "endMonth") {
          if (!endMonthInput.current || !endMonthInput.current.selectionStart)
            return;
          if (endMonthInput.current.selectionStart === 2)
            endDateInput.current?.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        if (datePart === "startMonth") {
          if (
            !startMonthInput.current ||
            !startMonthInput.current.selectionStart
          )
            return;
          if (startMonthInput.current.selectionStart === 1)
            startYearInput.current?.focus();
        }
        if (datePart === "startDate") {
          if (!startDateInput.current || !startDateInput.current.selectionStart)
            return;
          if (startDateInput.current.selectionStart === 1)
            startMonthInput.current?.focus();
        }
        if (datePart === "endYear") {
          if (!endYearInput.current || !endYearInput.current.selectionStart)
            return;
          if (endYearInput.current.selectionStart === 1)
            startDateInput.current?.focus();
        }
        if (datePart === "endMonth") {
          if (!endMonthInput.current || !endMonthInput.current.selectionStart)
            return;
          if (endMonthInput.current.selectionStart === 1)
            endYearInput.current?.focus();
        }
        if (datePart === "endDate") {
          if (!endDateInput.current || !endDateInput.current.selectionStart)
            return;
          if (endDateInput.current.selectionStart === 1)
            endMonthInput.current?.focus();
        }
      }
      if (event.key === "ArrowUp") {
        if (datePart === "startYear") setStartYear(startYear + 1);
        if (datePart === "startMonth" && startMonth < 12)
          setStartMonth(startMonth + 1);
        if (datePart === "startDate" && startDate < 31)
          setStartDate(startDate + 1);
        if (datePart === "endYear") setEndYear(endYear + 1);
        if (datePart === "endMonth" && endMonth < 12) setEndMonth(endMonth + 1);
        if (datePart === "endDate" && endDate < 31) setEndDate(endDate + 1);
      }

      if (event.key === "ArrowDown") {
        if (datePart === "startYear") setStartYear(startYear - 1);
        if (datePart === "startMonth" && startMonth > 1)
          setStartMonth(startMonth - 1);
        if (datePart === "startDate" && startDate > 1)
          setStartDate(startDate - 1);
        if (datePart === "endYear") setEndYear(endYear - 1);
        if (datePart === "endMonth" && endMonth > 1) setEndMonth(endMonth - 1);
        if (datePart === "endDate" && endDate > 1) setEndDate(endDate - 1);
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
      startYearInput.current !== document.activeElement &&
      startMonthInput.current !== document.activeElement &&
      startDateInput.current !== document.activeElement &&
      endYearInput.current !== document.activeElement &&
      endMonthInput.current !== document.activeElement &&
      endDateInput.current !== document.activeElement
    ) {
      setIsFocused(false);
    }
  };

  return (
    <Styled.Container isFocused={isFocused} isError={isError}>
      <Styled.Input
        ref={startYearInput}
        isError={isError}
        letterCount={4}
        type={"text"}
        aria-label="startYear"
        value={startYear}
        onChange={handleOnChange("startYear")}
        onKeyDown={handleOnKeyPress("startYear")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Styled.Slash>/</Styled.Slash>
      <Styled.Input
        ref={startMonthInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="startMonth"
        value={("00" + startMonth).slice(-2)}
        onChange={handleOnChange("startMonth")}
        onKeyDown={handleOnKeyPress("startMonth")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Styled.Slash>/</Styled.Slash>
      <Styled.Input
        ref={startDateInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="startDate"
        value={("00" + startDate).slice(-2)}
        onChange={handleOnChange("startDate")}
        onKeyDown={handleOnKeyPress("startDate")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Styled.Hyphen>-</Styled.Hyphen>
      <Styled.Input
        ref={endYearInput}
        isError={isError}
        letterCount={4}
        type={"text"}
        aria-label="endYear"
        value={endYear}
        onChange={handleOnChange("endYear")}
        onKeyDown={handleOnKeyPress("endYear")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Styled.Slash>/</Styled.Slash>
      <Styled.Input
        ref={endMonthInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="endMonth"
        value={("00" + endMonth).slice(-2)}
        onChange={handleOnChange("endMonth")}
        onKeyDown={handleOnKeyPress("endMonth")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Styled.Slash>/</Styled.Slash>
      <Styled.Input
        ref={endDateInput}
        isError={isError}
        letterCount={2}
        type={"text"}
        aria-label="endDate"
        value={("00" + endDate).slice(-2)}
        onChange={handleOnChange("endDate")}
        onKeyDown={handleOnKeyPress("endDate")}
        onInput={handleInputNumberOnly}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </Styled.Container>
  );
};

export default CalenderRangeInput;
