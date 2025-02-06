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

export const DataTable2MenuSpaceControl = () => {
  return (
    // 密度
    // このコンポーネントが親の ContextMenu2Provider 内に設置される前提なので、
    // ここでは ContextMenu2Provider は不要
    <ContextMenu2
      width={168}
      trigger={
        <ContextMenu2TriggerItem append="標準">
          表示密度を変更
        </ContextMenu2TriggerItem>
      }
    >
      <ContextMenu2CheckItem>より狭くする</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>狭くする</ContextMenu2CheckItem>
      <ContextMenu2CheckItem checked>標準</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>広くする</ContextMenu2CheckItem>
      <ContextMenu2CheckItem>より広くする</ContextMenu2CheckItem>
    </ContextMenu2>
  );
};
