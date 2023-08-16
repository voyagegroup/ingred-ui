export const DayState = {
  NONE: "none",
  START: "start",
  END: "end",
  BETWEEN: "between",
} as const;

export type DayStateType = (typeof DayState)[keyof typeof DayState];

export const ClickState = {
  START: "start",
  END: "end",
} as const;

export type ClickStateType = (typeof ClickState)[keyof typeof ClickState];
