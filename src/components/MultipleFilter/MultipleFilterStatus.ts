import { FilterPackType } from "./types";

export const Status = {
  Empty: 0,
  FilterSelecting: 1,
  ConditionSelecting: 2,
} as const;

export type Status = typeof Status[keyof typeof Status];

export const getCurrentStatus = (
  isFocus: boolean,
  selectedFilter: FilterPackType | null,
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
