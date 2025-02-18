import React, { useMemo, useCallback, useContext } from "react";
import { DataTable2Context } from "./context";
import type { Column } from "./types";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2SwitchItem,
  ContextMenu2SortableGroup,
  ContextMenu2SortableItem,
  ContextMenu2HelpTextItem,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";
import Button from "../Button";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群

export const DataTable2MenuOrderControl = () => {
  const { columns, setColumns } = useContext(DataTable2Context);

  const orderedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns],
  );

  const groupedColumns = useMemo(
    () =>
      orderedColumns.reduce(
        (acc, column) => {
          if (!column.sortable && acc.sortable.length === 0) {
            acc.startFixed.push(column);
            return acc;
          }
          if (column.sortable && acc.endFixed.length === 0) {
            acc.sortable.push(column);
            return acc;
          }
          acc.endFixed.push(column);
          return acc;
        },
        {
          startFixed: [] as Column[],
          sortable: [] as Column[],
          endFixed: [] as Column[],
        },
      ),
    [orderedColumns],
  );

  const handleOrderChange = useCallback(
    (order: (number | string)[]) => {
      const newColumns = structuredClone(columns);
      newColumns.forEach((c) => {
        const fixedCol =
          groupedColumns.startFixed.find((col) => col.id === c.id) ||
          groupedColumns.endFixed.find((col) => col.id === c.id);
        if (fixedCol) return;

        const newOrder = order.indexOf(c.id);
        if (newOrder === -1) return;
        c.order = groupedColumns.startFixed.length + newOrder;
      });
      setColumns(newColumns);
    },
    [columns, groupedColumns, setColumns],
  );

  return (
    // 並び替え
    // このコンポーネントが親の ContextMenu2Provider 内に設置される前提なので、
    // ここでは ContextMenu2Provider は不要
    <ContextMenu2
      width={328}
      trigger={<ContextMenu2TriggerItem>カラムを編集</ContextMenu2TriggerItem>}
    >
      {groupedColumns.startFixed.map((col) => (
        <ContextMenu2SortableItem key={col.id} disabled id={col.id}>
          <ContextMenu2SwitchItem disabled checked={col.visible}>
            {col.label}
          </ContextMenu2SwitchItem>
        </ContextMenu2SortableItem>
      ))}
      <ContextMenu2SortableGroup
        order={groupedColumns.sortable.map((col) => col.id)}
        onOrderChange={handleOrderChange}
      >
        {groupedColumns.sortable.map((col) => (
          <ContextMenu2SortableItem key={col.id} id={col.id}>
            <ContextMenu2SwitchItem
              checked={col.visible}
              onChange={() =>
                setColumns(
                  structuredClone(columns).map((c) =>
                    c.id === col.id ? { ...c, visible: !c.visible } : c,
                  ),
                )
              }
            >
              {col.label}
            </ContextMenu2SwitchItem>
          </ContextMenu2SortableItem>
        ))}
      </ContextMenu2SortableGroup>
      {groupedColumns.endFixed.map((col) => (
        <ContextMenu2SortableItem key={col.id} disabled id={col.id}>
          <ContextMenu2SwitchItem key={col.id} disabled checked={col.visible}>
            {col.label}
          </ContextMenu2SwitchItem>
        </ContextMenu2SortableItem>
      ))}
      <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
        カラムの並び順、表示・非表示を切り替えます。
      </ContextMenu2HelpTextItem>
      <ContextMenu2SeparatorItem />
      <ContextMenu2ButtonControlsItem>
        <Button size="small" color="secondary">
          キャンセル
        </Button>
        <Button size="small">適用</Button>
      </ContextMenu2ButtonControlsItem>
    </ContextMenu2>
  );
};
