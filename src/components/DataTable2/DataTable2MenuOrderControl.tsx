import React, { useState, useMemo, useCallback, useContext } from "react";
import { DataTable2Context } from "./context";
import type { Column2 } from "./types";
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
type DataTable2MenuOrderControlProps = {
  onClose: () => void;
};

export const DataTable2MenuOrderControl = ({
  onClose,
}: DataTable2MenuOrderControlProps) => {
  const { columns, setColumns } = useContext(DataTable2Context);
  const [userChangedColumns, setUserChangedColumns] =
    useState<Column2[]>(columns);

  const orderedColumns = useMemo(
    () => [...userChangedColumns].sort((a, b) => a.order - b.order),
    [userChangedColumns],
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
          startFixed: [] as Column2[],
          sortable: [] as Column2[],
          endFixed: [] as Column2[],
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
      setUserChangedColumns(newColumns);
    },
    [columns, groupedColumns],
  );

  const handleCancelButtonClick = useCallback(() => {
    setUserChangedColumns(columns);
    onClose();
  }, [columns, onClose]);

  const handleApplyButtonClick = useCallback(() => {
    setColumns(userChangedColumns);
    onClose();
  }, [setColumns, userChangedColumns, onClose]);

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
                setUserChangedColumns(
                  userChangedColumns.map((c) =>
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
        <Button size="small" color="clear" onClick={handleCancelButtonClick}>
          キャンセル
        </Button>
        <Button size="small" onClick={handleApplyButtonClick}>
          適用
        </Button>
      </ContextMenu2ButtonControlsItem>
    </ContextMenu2>
  );
};
