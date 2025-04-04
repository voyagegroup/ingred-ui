import React, {
  useMemo,
  useCallback,
  useContext,
  type ReactNode,
  type CSSProperties,
} from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { DualListBox2Context } from "./lib";

type DualListBox2ItemProps = {
  id: string;
  children: ReactNode;
  disableInclude?: boolean;
  disableExclude?: boolean;
  /** アイテムが追加済みかどうかを外部から制御 */
  isIncluded?: boolean;
  /** アイテムが除外済みかどうかを外部から制御 */
  isExcluded?: boolean;
};

export const DualListBox2Item = ({
  id,
  disableInclude,
  disableExclude,
  children,
  isIncluded: isIncludedProp,
  isExcluded: isExcludedProp,
}: DualListBox2ItemProps) => {
  const {
    filterWords,
    includedIds,
    excludedIds,
    onIncludedChange,
    onExcludedChange,
  } = useContext(DualListBox2Context);

  // 外部からpropsが渡された場合はそちらを優先
  const isIncluded = useMemo(
    () =>
      isIncludedProp !== undefined ? isIncludedProp : includedIds.includes(id),
    [isIncludedProp, includedIds, id],
  );
  const isExcluded = useMemo(
    () =>
      isExcludedProp !== undefined ? isExcludedProp : excludedIds.includes(id),
    [isExcludedProp, excludedIds, id],
  );

  const handleAddButtonClick = useCallback(() => {
    const newIncluded = !isIncluded;

    // 内部状態を更新
    const newIncludedIds = newIncluded
      ? [...includedIds, id]
      : includedIds.filter((item) => item !== id);
    onIncludedChange(newIncludedIds);

    if (isExcluded) {
      onExcludedChange(excludedIds.filter((item) => item !== id));
    }
  }, [
    id,
    includedIds,
    excludedIds,
    isIncluded,
    isExcluded,
    onIncludedChange,
    onExcludedChange,
  ]);

  const handleExcludeButtonClick = useCallback(() => {
    const newExcluded = !isExcluded;

    // 内部状態を更新
    const newExcludedIds = newExcluded
      ? [...excludedIds, id]
      : excludedIds.filter((item) => item !== id);
    onExcludedChange(newExcludedIds);

    if (isIncluded) {
      onIncludedChange(includedIds.filter((item) => item !== id));
    }
  }, [
    id,
    includedIds,
    excludedIds,
    isIncluded,
    isExcluded,
    onIncludedChange,
    onExcludedChange,
  ]);

  const contentsText = children?.toString();

  if (
    !!contentsText &&
    !!filterWords.length &&
    !filterWords.every((word) => contentsText.includes(word))
  ) {
    return null;
  }

  const getIconColor = (
    isDisabled: boolean | undefined,
    isActive: boolean,
    activeColor: string,
  ) => {
    if (isDisabled) return colors.basic[400];
    if (isActive) return activeColor;
    return colors.basic[900];
  };

  return (
    <styled.DualListBox2Item>
      {children}
      <styled.ItemActions>
        <li>
          <button
            type="button"
            disabled={disableInclude}
            aria-pressed={isIncluded}
            aria-label="追加"
            style={{ "--color": colors.blue[500] } as CSSProperties}
            onClick={handleAddButtonClick}
          >
            <Icon
              name="check_thin"
              color={getIconColor(disableInclude, isIncluded, colors.blue[500])}
            />
          </button>
        </li>
        <li>
          <button
            type="button"
            disabled={disableExclude}
            aria-pressed={isExcluded}
            aria-label="除外"
            style={{ "--color": colors.red[500] } as CSSProperties}
            onClick={handleExcludeButtonClick}
          >
            <Icon
              name="forbid"
              color={getIconColor(disableExclude, isExcluded, colors.red[500])}
            />
          </button>
        </li>
      </styled.ItemActions>
    </styled.DualListBox2Item>
  );
};
DualListBox2Item.displayName = "DualListBox2Item";
