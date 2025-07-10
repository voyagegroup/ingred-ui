export type { TableColumn, SortDirection } from "./types";
export type { TableAction } from "./types/tableActions"; // メインの型定義に変更
// export type { LegacyTableAction } from "./DataTable2"; // 後方互換のため保持（削除済み）
export { DataTable2 } from "./DataTable2";
export { DataTable2Head } from "./DataTable2Head";
export { DataTable2Column, DataTable2ColumnLabel } from "./DataTable2Column";
export { DataTable2Body } from "./DataTable2Body";
export { DataTable2Row } from "./DataTable2Row";
export { DataTable2Cell } from "./DataTable2Cell";
export { DataTable2ActionButton } from "./DataTable2ActionButton";
export {
  DataTable2InlineEditor,
  DataTable2InlineSelectEditor,
} from "./DataTable2InlineEditor";
