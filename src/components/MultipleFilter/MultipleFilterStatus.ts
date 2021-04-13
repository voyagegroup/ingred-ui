import { FilterPackType, ReferedFilterType } from "./types";

export const Status = {
  Empty: 0,
  FilterSelecting: 1,
  ConditionSelecting: 2,
  ConditionEditting: 3,
} as const;

export type Status = typeof Status[keyof typeof Status];

export const getCurrentStatus = (
  isFocus: boolean,
  selectedFilter: FilterPackType | null,
  willEditFilter: ReferedFilterType | null,
): Status => {
  if (!isFocus) {
    return Status.Empty;
  }
  if (willEditFilter) {
    return Status.ConditionEditting;
  }
  if (selectedFilter === null) {
    return Status.FilterSelecting;
  }
  if (selectedFilter !== null) {
    return Status.ConditionSelecting;
  }

  return Status.Empty;
};
