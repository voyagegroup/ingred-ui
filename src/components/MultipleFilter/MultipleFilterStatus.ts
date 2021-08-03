import { FilterPackType, ReferredFilterType } from "./types";

export const Status = {
  Empty: 0,
  FilterSelecting: 1,
  ConditionSelecting: 2,
  ConditionEditing: 3,
} as const;

export type Status = typeof Status[keyof typeof Status];

export const getCurrentStatus = (
  isFocus: boolean,
  selectedFilter: FilterPackType | null,
  willEditFilter: ReferredFilterType | null,
): Status => {
  if (!isFocus) {
    return Status.Empty;
  }
  if (willEditFilter) {
    return Status.ConditionEditing;
  }
  if (selectedFilter === null) {
    return Status.FilterSelecting;
  }
  if (selectedFilter !== null) {
    return Status.ConditionSelecting;
  }

  return Status.Empty;
};
