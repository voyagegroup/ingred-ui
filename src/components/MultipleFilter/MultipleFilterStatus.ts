export const Status = {
  Empty: 0,
  FilterSelecting: 1,
  ConditionSelecting: 2,
} as const;

export type Status = typeof Status[keyof typeof Status];

// TODO: anyを外す
export const getCurrentStatus = (
  isFocus: boolean,
  selectedFilter: any,
): Status => {
  if (!isFocus) {
    return Status.Empty;
  }
  if (selectedFilter === null) {
    return Status.FilterSelecting;
  }
  if (selectedFilter !== null) {
    return Status.ConditionSelecting;
  }

  return Status.Empty;
};
