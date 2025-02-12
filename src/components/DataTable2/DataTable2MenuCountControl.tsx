import React from "react";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

export type DataTable2MenuCountControlProps = {
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (itemsPerPage: number) => void;
};

// 左上コントロール群
export const DataTable2MenuCountControl = ({
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: DataTable2MenuCountControlProps) => {
  return (
    // 並び替え
    // このコンポーネントが親の ContextMenu2Provider 内に設置される前提なので、
    // ここでは ContextMenu2Provider は不要
    <ContextMenu2
      width={136}
      trigger={
        <ContextMenu2TriggerItem
          append={(() => {
            const text = [10, 20, 50, 100, 200].join(", ");
            return text.length > 16 ? `${text.slice(0, 16)}...` : text;
          })()}
        >
          件数を変更
        </ContextMenu2TriggerItem>
      }
    >
      {pageSizeOptions.map((size) => (
        <ContextMenu2CheckItem
          key={size}
          checked={pageSize === size}
          onChange={() => onPageSizeChange(size)}
        >
          {size}件
        </ContextMenu2CheckItem>
      ))}
    </ContextMenu2>
  );
};
