import { createContext } from "react";

////////////////////////////////////////////////////////////////////////////////
// Contexts
////////////////////////////////////////////////////////////////////////////////

// thead 内の各 th すべての幅のリストを root で知るためのコンテキスト
export const DataTable2Context = createContext<{
  isSmallLayout: boolean;
  rowIds: string[];
  checkedRows: string[];
  columnWidths: (number | null)[];
  setRowIds: (rowIds: string[]) => void;
  setCheckedRows: (rowIds: string[]) => void;
  onColumnWidthChange: (index: number, width: number | null) => void;
}>({
  isSmallLayout: false,
  rowIds: [],
  checkedRows: [],
  columnWidths: [],
  setRowIds: () => {},
  setCheckedRows: () => {},
  onColumnWidthChange: () => {},
});

// thead 内の各 th （横並び）が、自分の index を知るためのコンテキスト
export const ColumnContext = createContext<{
  index: number;
}>({
  index: 0,
});
