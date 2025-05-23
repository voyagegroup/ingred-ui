import styled, { css } from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2CheckItem } from "../ContextMenu2/ContextMenu2CheckItem";
import {
  FILTER_SIZES,
  FilterSize,
  FilterVariant,
  FILTER_VARIANTS,
} from "./types";

// フィルターのベーススタイル
export const filterBaseStyle = css`
  border: 1px solid ${colors.basic[400]};
  background-color: ${colors.basic[0]};
`;

// サイズに応じたスタイルを生成するヘルパー関数
export const getFilterSizeStyle = (size: FilterSize) => css`
  height: ${FILTER_SIZES[size].height};
  border-radius: ${FILTER_SIZES[size].borderRadius};
`;

// トリガーのアイコンサイズスタイルを生成するヘルパー関数
export const getTriggerIconSizeStyle = (size: FilterSize) => css`
  /* 左側のアイコン */
  span:first-child {
    width: ${FILTER_SIZES[size].iconSize};
    height: ${FILTER_SIZES[size].iconSize};
    svg {
      width: ${FILTER_SIZES[size].iconSize};
      height: ${FILTER_SIZES[size].iconSize};
    }
  }
  /* 右側の矢印アイコン */
  span:last-child {
    width: ${FILTER_SIZES[size].arrowIconSize};
    height: ${FILTER_SIZES[size].arrowIconSize};
    svg {
      width: ${FILTER_SIZES[size].arrowIconSize};
      height: ${FILTER_SIZES[size].arrowIconSize};
    }
  }
  padding: ${FILTER_SIZES[size].padding};
`;

export const FilterInputAbstract = styled.div<{
  $isOpen?: boolean;
  $error?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0;
  ${filterBaseStyle}
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  border: 1px solid
    ${({ $error, $disabled, $isOpen }) => {
      if ($error) return colors.red[500];
      if ($disabled) return colors.basic[400];
      if ($isOpen) return colors.blue[500];
      return colors.basic[400];
    }};

  &:hover:not([data-disabled="true"]) {
    border-color: ${({ $error, theme }) =>
      $error ? colors.red[500] : theme.palette.primary.main};
  }

  ${({ $isOpen, $error }) =>
    $isOpen &&
    `
    box-shadow: 0 0 0 3px ${
      $error ? `${colors.red[200]}66` : `${colors.blue[200]}66`
    };
  `}

  &[data-disabled="true"] {
    background-color: ${colors.basic[200]};
    border-color: ${colors.basic[400]};

    /* 入力エリアのみ無効化 */
    > :nth-child(2) {
      cursor: not-allowed;
      user-select: none;
      transition: all 0.2s ease;

      /* 共通のdisabledスタイル */
      &,
      input,
      button {
        color: ${colors.basic[400]};
        background-color: ${colors.basic[200]};
      }

      input,
      button {
        cursor: not-allowed;
        pointer-events: none;
      }

      button svg {
        color: ${colors.basic[400]};
      }
    }
  }

  &[data-size="small"] {
    ${getFilterSizeStyle("small")}
  }

  &[data-size="medium"] {
    ${getFilterSizeStyle("medium")}
  }

  &[data-size="large"] {
    ${getFilterSizeStyle("large")}
  }

  &[data-small="true"] {
    display: block;
    border: 0;
    border-radius: 0px;
    background-color: transparent;
  }
`;

export const DropDownTrigger = styled.button<{
  disabled?: boolean;
  $variant?: FilterVariant;
}>`
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  display: flex;
  column-gap: 2px;
  align-items: center;
  height: 100%;
  border: 0;
  border-right: 1px solid ${colors.basic[400]};
  outline-offset: -1px;
  color: ${({ disabled }) =>
    disabled ? colors.basic[400] : colors.basic[900]};
  background: ${({ disabled, $variant = "light" }) =>
    disabled ? colors.basic[200] : FILTER_VARIANTS[$variant].background};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  /* アイコンの色を制御 */
  svg {
    color: ${({ disabled }) => (disabled ? colors.basic[400] : "currentColor")};
    transition: color 0.2s ease;
  }

  /* サイズバリエーション */
  &:where(${FilterInputAbstract}[data-size="small"] *) {
    ${getTriggerIconSizeStyle("small")}
  }

  &:where(${FilterInputAbstract}[data-size="medium"] *) {
    ${getTriggerIconSizeStyle("medium")}
  }

  &:where(${FilterInputAbstract}[data-size="large"] *) {
    ${getTriggerIconSizeStyle("large")}
  }

  &:where(${FilterInputAbstract.toString()}[data-small="true"] *) {
    display: none;
  }
`;

export const StyledContextMenu2CheckItem = styled(ContextMenu2CheckItem)`
  svg {
    width: 22px;
    height: 22px;
  }
  span {
    width: 22px;
    height: 22px;
  }
`;
