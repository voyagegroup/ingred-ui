import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import * as styled from "./styled";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2HeadingItem,
  ContextMenu2SwitchItem,
  ContextMenu2HelpTextItem,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";
import Button from "../Button";
import { DataTable2Context } from "./context";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2FilterControls = () => {
  const { columns, setColumns } = useContext(DataTable2Context);

  const [isOpen, setIsOpen] = useState(false);
  const [userChecked, setUserChecked] = useState<boolean[]>(
    columns.map((c) => c.filtered || false),
  );
  const numOfFilters = useMemo(
    () => columns.filter((column) => column.filtered).length,
    [columns],
  );

  const reset = useCallback(() => {
    setUserChecked(columns.map((c) => c.filtered || false));
  }, [columns]);

  const handleOptionChange = useCallback(
    (i: number, checked: boolean) => {
      setUserChecked((prev) => prev.map((v, j) => (i === j ? checked : v)));
    },
    [setUserChecked],
  );

  const handleCancel = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  const handleApply = useCallback(() => {
    const newColumns = structuredClone(columns).map((column, i) => {
      return { ...column, filtered: userChecked[i] };
    });
    setColumns(newColumns);
    setIsOpen(false);
  }, [columns, setColumns, userChecked]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) reset();
    },
    [setIsOpen, reset],
  );

  useEffect(() => reset(), [columns, reset]);
  return (
    <ContextMenu2Container>
      <ContextMenu2
        width={336}
        trigger={
          <styled.RowMenuFilterTrigger
            type="button"
            disabled={numOfFilters === 0}
          >
            <Icon name="filter" color="currentColor" />
            {numOfFilters}列に適用中
          </styled.RowMenuFilterTrigger>
        }
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <ContextMenu2HeadingItem>
          フィルタが適用されている列
        </ContextMenu2HeadingItem>
        {columns.map((column, i) => {
          // column.filteredは true, false, undefined のいずれか。
          // true 以外では何も表示しない。
          if (column.filtered === true) {
            return (
              <ContextMenu2SwitchItem
                key={column.id}
                checked={userChecked[i]}
                onChange={(checked) => handleOptionChange(i, checked)}
              >
                {column.label}
              </ContextMenu2SwitchItem>
            );
          }
          return null;
        })}
        <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
          リセットしたいフィルタのボタンをオフにしてください
        </ContextMenu2HelpTextItem>
        <ContextMenu2SeparatorItem />
        <ContextMenu2ButtonControlsItem>
          <Button
            type="button"
            size="small"
            color="clear"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button type="button" size="small" onClick={handleApply}>
            適用
          </Button>
        </ContextMenu2ButtonControlsItem>
      </ContextMenu2>
    </ContextMenu2Container>
  );
};
