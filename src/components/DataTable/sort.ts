import * as React from "react";

export type OrderStatus = "desc" | "asc" | null;

export type GetValue<T> = (obj: T) => string | number;

export type CurrentSortState<T> = {
  isDesc: boolean;
  name: string;
  getValue?: GetValue<T>;
};

const defaultGetValue = (obj: any): string | number => obj;

export const useOrderState = <T>(
  getValue: GetValue<T> = defaultGetValue,
  name: string,
  order?: "desc" | "asc",
) =>
  React.useState<CurrentSortState<T>>({
    getValue,
    name,
    isDesc: order === "desc",
  });

export const changeOrderState = <T>(
  currentSortState: CurrentSortState<T>,
  getValue: GetValue<T>,
  name: string,
): CurrentSortState<T> => ({
  isDesc:
    // MEMO(yutaro1031): 「今ソート状態である列をクリックしたか？」を判定
    currentSortState.name === name ? !currentSortState.isDesc : false,
  getValue,
  name,
});

export const getOrder = <T>(
  currentSortState: CurrentSortState<T>,
  name: string,
): OrderStatus => {
  // MEMO(yutaro1031): 「該当する列がソート状態であるか？」を判定し、アイコンを表示するための引数を返す
  const isActiveColumn = currentSortState.name === name;
  if (!isActiveColumn) return null;
  return currentSortState.isDesc ? "desc" : "asc";
};

export const desc = <T>(
  a: any,
  b: any,
  getValue: GetValue<T> = defaultGetValue,
) => {
  const itemA = getValue(a);
  const itemB = getValue(b);
  if (itemB === itemA) return 0;
  return itemB < itemA ? -1 : 1;
};

export const sort = <T>(array: any[], order: CurrentSortState<T>) =>
  array.sort((a, b) => {
    const result = desc<T>(a, b, order.getValue);
    return order.isDesc ? result : -result;
  });
