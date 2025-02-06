import React from "react";
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
      <ContextMenu2CheckItem>10件</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>20件</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>50件</ContextMenu2CheckItem>
      <ContextMenu2CheckItem checked>100件</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>200件</ContextMenu2CheckItem>
    </ContextMenu2>
  );
};
