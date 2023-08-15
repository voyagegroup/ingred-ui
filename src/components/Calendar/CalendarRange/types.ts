import { Dayjs } from "dayjs";

export type DateRange = {
  startDate: Dayjs;
  endDate: Dayjs;
};

export type ClickState = "start" | "end";
