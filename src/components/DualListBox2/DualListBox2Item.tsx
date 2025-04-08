import React, { type ReactNode, type CSSProperties, useContext } from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { DualListBox2Context } from "./lib";

export type DualListBox2ItemProps = {
  id: string;
  children: ReactNode;
  disableInclude?: boolean;
  disableExclude?: boolean;
};

export const DualListBox2Item: React.FC<DualListBox2ItemProps> = ({
  id,
  children,
  disableInclude,
  disableExclude,
}) => {
  const {
    includedIds,
    excludedIds,
    onIncludedChange,
    onExcludedChange
  } = useContext(DualListBox2Context);

  const isIncluded = includedIds.includes(id);
  const isExcluded = excludedIds.includes(id);

  const getIconColor = (
    isDisabled: boolean | undefined,
    isActive: boolean,
    activeColor: string,
  ) => {
    if (isDisabled) return colors.basic[400];
    if (isActive) return activeColor;
    return colors.basic[900];
  };

  const handleIncludeClick = () => {
    if (isIncluded) {
      // チェックが付いている状態でクリックされたら解除
      onIncludedChange(includedIds.filter(itemId => itemId !== id));
    } else if (isExcluded) {
      // 除外状態の場合、除外を解除して追加
      onExcludedChange(excludedIds.filter(itemId => itemId !== id));
      onIncludedChange([...includedIds, id]);
    } else {
      // 未選択状態なら追加
      onIncludedChange([...includedIds, id]);
    }
  };

  const handleExcludeClick = () => {
    if (isExcluded) {
      // 除外状態でクリックされたら解除
      onExcludedChange(excludedIds.filter(itemId => itemId !== id));
    } else if (isIncluded) {
      // 追加状態の場合、追加を解除して除外
      onIncludedChange(includedIds.filter(itemId => itemId !== id));
      onExcludedChange([...excludedIds, id]);
    } else {
      // 未選択状態なら除外
      onExcludedChange([...excludedIds, id]);
    }
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
            onClick={handleIncludeClick}
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
            onClick={handleExcludeClick}
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
