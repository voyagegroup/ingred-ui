export const Status = {
  Empty: 0,
  FilterSelecting: 1,
  ConditionSelecting: 2,
} as const;

export type Status = typeof Status[keyof typeof Status];
