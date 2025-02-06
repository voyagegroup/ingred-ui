import React, { useState, useMemo, useCallback } from "react";
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
type Column = {
  id: number;
  label: string;
  checked: boolean;
  sortable: boolean;
};

export const DataTable2MenuOrderControl = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, label: "名前", checked: true, sortable: false },
    { id: 2, label: "ステータス", checked: true, sortable: true },
    { id: 3, label: "メールアドレス", checked: false, sortable: true },
    { id: 4, label: "登録日", checked: true, sortable: true },
    { id: 5, label: "操作", checked: true, sortable: false },
  ]);

  const groupedColumns = useMemo(
    () =>
      columns.reduce(
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
    [columns],
  );

  const handleOrderChange = useCallback(
    (order: (number | string)[]) => {
      const newSortableColumns = order
        .map((id) => groupedColumns.sortable.find((column) => column.id === id))
        .filter((column): column is Column => !!column);
      const newColumnOrder = [
        ...groupedColumns.startFixed,
        ...newSortableColumns,
        ...groupedColumns.endFixed,
      ];
      setColumns(newColumnOrder);
    },
    [groupedColumns],
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
          <ContextMenu2SwitchItem disabled checked={col.checked}>
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
              checked={col.checked}
              onChange={() =>
                setColumns((columns) =>
                  columns.map((c) =>
                    c.id === col.id ? { ...c, checked: !c.checked } : c,
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
          <ContextMenu2SwitchItem key={col.id} disabled checked={col.checked}>
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
