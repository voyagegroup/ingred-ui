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
};

export const DualListBox2Item = ({
  id,
  disableInclude,
  disableExclude,
  children,
}: DualListBox2ItemProps) => {
  const {
    filterWords,
    includedIds,
    excludedIds,
    onIncludedChange,
    onExcludedChange,
  } = useContext(DualListBox2Context);

  const isIncluded = useMemo(() => includedIds.includes(id), [includedIds, id]);
  const isExcluded = useMemo(() => excludedIds.includes(id), [excludedIds, id]);

  const handleAddButtonClick = useCallback(() => {
    const newIncludedIds = isIncluded
      ? includedIds.filter((item) => item !== id)
      : [...includedIds, id];
    onIncludedChange(newIncludedIds);
    if (isExcluded) onExcludedChange(excludedIds.filter((item) => item !== id));
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
    const newExcludedIds = isExcluded
      ? excludedIds.filter((item) => item !== id)
      : [...excludedIds, id];
    onExcludedChange(newExcludedIds);
    if (isIncluded) onIncludedChange(includedIds.filter((item) => item !== id));
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
