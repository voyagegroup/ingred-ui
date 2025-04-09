import { useState, useCallback, useMemo } from "react";

export type Item = {
  id: string;
  label: string;
  groupName?: string;
};

type UseDualListBox2Props = {
  items: Item[];
  onChange?: (selected: Item[]) => void;
};

type UseDualListBox2Return = {
  includedItems: Item[];
  excludedItems: Item[];
  handleIncludedChange: (ids: string[]) => void;
  handleExcludedChange: (ids: string[]) => void;
  isItemIncluded: (id: string) => boolean;
  isItemExcluded: (id: string) => boolean;
};

export const useDualListBox2 = ({
  items,
  onChange,
}: UseDualListBox2Props): UseDualListBox2Return => {
  const [includedIds, setIncludedIds] = useState<Set<string>>(new Set());
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());

  const includedItems = useMemo(
    () => items.filter((item) => includedIds.has(item.id)),
    [items, includedIds],
  );

  const excludedItems = useMemo(
    () => items.filter((item) => excludedIds.has(item.id)),
    [items, excludedIds],
  );

  const handleIncludedChange = useCallback(
    (newIncludedIds: string[]) => {
      setIncludedIds(new Set(newIncludedIds));
      const newIncludedItems = items.filter((item) =>
        newIncludedIds.includes(item.id),
      );
      onChange?.(newIncludedItems);
    },
    [items, onChange],
  );

  const handleExcludedChange = useCallback((newExcludedIds: string[]) => {
    setExcludedIds(new Set(newExcludedIds));
  }, []);

  const isItemIncluded = useCallback(
    (id: string) => includedIds.has(id),
    [includedIds],
  );

  const isItemExcluded = useCallback(
    (id: string) => excludedIds.has(id),
    [excludedIds],
  );

  return {
    includedItems,
    excludedItems,
    handleIncludedChange,
    handleExcludedChange,
    isItemIncluded,
    isItemExcluded,
  };
};
