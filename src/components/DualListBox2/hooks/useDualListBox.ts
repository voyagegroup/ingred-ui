import { useState, useCallback, useMemo } from 'react';

export type DualListBoxItem = {
  id: string;
  [key: string]: any;
};

type UseDualListBoxOptions = {
  initialItems?: DualListBoxItem[];
  onChange?: (selectedItems: { included: string[]; excluded: string[] }) => void;
};

export const useDualListBox = (options: UseDualListBoxOptions = {}) => {
  const [includedIds, setIncludedIds] = useState<string[]>([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const handleInclude = useCallback((id: string) => {
    setIncludedIds((prev) => {
      const newIncluded = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];

      // 除外リストから削除
      setExcludedIds((prevExcluded) =>
        prevExcluded.filter((itemId) => itemId !== id)
      );

      options.onChange?.({
        included: newIncluded,
        excluded: excludedIds.filter((itemId) => itemId !== id),
      });

      return newIncluded;
    });
  }, [excludedIds, options]);

  const handleExclude = useCallback((id: string) => {
    setExcludedIds((prev) => {
      const newExcluded = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];

      // 包含リストから削除
      setIncludedIds((prevIncluded) =>
        prevIncluded.filter((itemId) => itemId !== id)
      );

      options.onChange?.({
        included: includedIds.filter((itemId) => itemId !== id),
        excluded: newExcluded,
      });

      return newExcluded;
    });
  }, [includedIds, options]);

  const isItemIncluded = useCallback(
    (id: string) => includedIds.includes(id),
    [includedIds]
  );

  const isItemExcluded = useCallback(
    (id: string) => excludedIds.includes(id),
    [excludedIds]
  );

  return {
    includedIds,
    excludedIds,
    handleInclude,
    handleExclude,
    isItemIncluded,
    isItemExcluded,
  };
}; 