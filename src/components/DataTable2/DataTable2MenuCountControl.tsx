import React, { useContext } from "react";
import { DataTable2Context } from "./context";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2MenuCountControl = () => {
  const { pageSize, pageSizeOptions, setPageSize } =
    useContext(DataTable2Context);
  return (
    // 並び替え
    // このコンポーネントが親の ContextMenu2Provider 内に設置される前提なので、
    // ここでは ContextMenu2Provider は不要
    <ContextMenu2
      width={136}
      trigger={
        <ContextMenu2TriggerItem append={pageSize}>
          件数を変更
        </ContextMenu2TriggerItem>
      }
    >
      {pageSizeOptions.map((size) => (
        <ContextMenu2CheckItem
          key={size}
          closeOnChange
          checked={pageSize === size}
          onChange={() => setPageSize(size)}
        >
          {size}件
        </ContextMenu2CheckItem>
      ))}
    </ContextMenu2>
  );
};
