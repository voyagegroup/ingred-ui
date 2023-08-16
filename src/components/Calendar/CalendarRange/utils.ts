import dayjs, { Dayjs } from "dayjs";
import { DayState } from "./constants";

const isStart = (startDate: Dayjs | null, month: Dayjs, day: number) =>
  startDate?.format("YYYY-MM-DD") ===
  dayjs(new Date(month.year(), month.month(), day)).format("YYYY-MM-DD");

const isEnd = (endDate: Dayjs | null, month: Dayjs, day: number) =>
  endDate?.format("YYYY-MM-DD") ===
  dayjs(new Date(month.year(), month.month(), day)).format("YYYY-MM-DD");

const isBetween = (
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  month: Dayjs,
  day: number,
) =>
  (startDate &&
    endDate &&
    dayjs(new Date(month.year(), month.month(), day)).isAfter(
      startDate.format("YYYY-MM-DD"),
      "day",
    ) &&
    dayjs(new Date(month.year(), month.month(), day)).isBefore(
      endDate.format("YYYY-MM-DD"),
      "day",
    )) ??
  false;

export const getDayState = (
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  month: Dayjs,
  day: number,
) => {
  switch (true) {
    case isStart(startDate, month, day):
      return DayState.START;
    case isEnd(endDate, month, day):
      return DayState.END;
    case isBetween(startDate, endDate, month, day):
      return DayState.BETWEEN;
    default:
      return DayState.NONE;
  }
};
