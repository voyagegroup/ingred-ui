import React, { useContext, useMemo } from "react";
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

const spacings = [
  { value: -2, label: "より狭くする" },
  { value: -1, label: "狭くする" },
  { value: 0, label: "標準" },
  { value: 1, label: "広くする" },
  { value: 2, label: "より広くする" },
] as const;

export const DataTable2MenuSpaceControl = () => {
  const { rowSpacing, setRowSpacing } = useContext(DataTable2Context);
  const currentLabel = useMemo(() => {
    return spacings.find((s) => s.value === rowSpacing)?.label || "標準";
  }, [rowSpacing]);
  const handleOnChange = (spacing: -2 | -1 | 0 | 1 | 2) => {
    setRowSpacing(spacing);
  };

  return (
    // 密度
    // このコンポーネントが親の ContextMenu2Provider 内に設置される前提なので、
    // ここでは ContextMenu2Provider は不要
    <ContextMenu2
      width={168}
      trigger={
        <ContextMenu2TriggerItem append={currentLabel}>
          表示密度を変更
        </ContextMenu2TriggerItem>
      }
    >
      {spacings.map(({ value, label }) => (
        <ContextMenu2CheckItem
          key={value}
          closeOnChange
          checked={rowSpacing === value}
          onChange={() => handleOnChange(value)}
        >
          {label}
        </ContextMenu2CheckItem>
      ))}
    </ContextMenu2>
  );
};
