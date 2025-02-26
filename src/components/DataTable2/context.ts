import { createContext } from "react";
import type { Column } from "./types";

////////////////////////////////////////////////////////////////////////////////
// Contexts
////////////////////////////////////////////////////////////////////////////////
export type RowSpacing = -2 | -1 | 0 | 1 | 2;

// thead 内の各 th すべての幅のリストを root で知るためのコンテキスト
export const DataTable2Context = createContext<
  {
    rowIds: string[]; // 全行の ID のリスト。コンテキストを通して、枝葉コンポーネントで共有する
    hasRowControls: boolean;
    checkedRows: string[];
    columns: Column[];
    setRowIds: (rowIds: string[]) => void;
    setCheckedRows: (rowIds: string[]) => void;
    setColumns: (columns: Column[]) => void;
  } & {
    // ページネーション関連
    totalCount: number;
    currentPage: number;
    pageSize: number;
    pageSizeOptions: number[];
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void; // num of items per page
  } & {
    // レイアウト関連
    isSmallLayout: boolean;
    columnWidths: (number | null)[];
    rowSpacing: RowSpacing; // 「密度」の指定。密度とは、上下 padding の広さを示す。
    setColumnWidth: (index: number, width: number | null) => void;
    setRowSpacing: (spacing: RowSpacing) => void;
  }
>({
  rowIds: [],
  hasRowControls: false,
  checkedRows: [],

  isSmallLayout: false,
  totalCount: 0,
  currentPage: 0,
  pageSize: 100,
  pageSizeOptions: [10, 50, 100, 200],

  columns: [],
  columnWidths: [],
  rowSpacing: 0,
  setRowIds: () => {},
  setCheckedRows: () => {},
  setCurrentPage: () => {},
  setPageSize: () => {},
  setColumns: () => {},
  setColumnWidth: () => {},
  setRowSpacing: () => {},
});

// thead 内の各 th （横並び）が、自分の index を知るためのコンテキスト
export const ColumnContext = createContext<{
  index: number;
}>({
  index: 0,
});
