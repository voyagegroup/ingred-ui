import { Dayjs } from "dayjs";

export type DateRange = {
  startDate: Dayjs;
  endDate: Dayjs;
};

export const ClickState = {
  START: "start",
  END: "end",
};

export type ClickStateType = (typeof ClickState)[keyof typeof ClickState];
