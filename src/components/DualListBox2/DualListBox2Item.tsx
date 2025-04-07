import React, { type ReactNode, type CSSProperties } from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";

export type DualListBox2ItemProps = {
  id: string;
  children: ReactNode;
  isIncluded?: boolean;
  isExcluded?: boolean;
  onInclude?: (id: string) => void;
  onExclude?: (id: string) => void;
  disableInclude?: boolean;
  disableExclude?: boolean;
};

export const DualListBox2Item: React.FC<DualListBox2ItemProps> = ({
  id,
  children,
  isIncluded = false,
  isExcluded = false,
  onInclude,
  onExclude,
  disableInclude,
  disableExclude,
}) => {
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
            onClick={() => onInclude?.(id)}
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
            onClick={() => onExclude?.(id)}
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
