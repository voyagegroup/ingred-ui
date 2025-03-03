export type TableColumn = {
  id: string;
  label: string;
  order: number;
  visible: boolean;
  sortable: boolean;
  /**
   * true で入力値あり、false で入力値なし、undefined でフィルタ入力機能なし
   */
  filtered?: boolean | undefined;
};

export type SortDirection = "asc" | "desc" | undefined;
