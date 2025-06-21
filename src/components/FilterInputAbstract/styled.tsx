import styled, { css } from "styled-components";
import { ContextMenu2CheckItem } from "../ContextMenu2/ContextMenu2CheckItem";
import {
  FILTER_SIZES,
  FilterSize,
  FilterVariant,
  getFilterVariantConfig,
} from "./types";

// フィルターのベーススタイル
export const filterBaseStyle = css`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.default};
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
    ${({ $error, $disabled, $isOpen, theme }) => {
      if ($error) return theme.palette.danger.main;
      if ($disabled) return theme.palette.divider;
      if ($isOpen) return theme.palette.primary.main;
      return theme.palette.divider;
    }};

  &:hover:not([data-disabled="true"]) {
    border-color: ${({ $error, theme }) =>
      $error ? theme.palette.danger.main : theme.palette.primary.main};
  }

  ${({ $isOpen, $error, theme }) =>
    $isOpen &&
    `
    box-shadow: 0 0 0 3px ${
      $error
        ? `${theme.palette.danger.light}66`
        : `${theme.palette.primary.light}66`
    };
  `}

  &[data-disabled="true"] {
    background-color: ${({ theme }) => theme.palette.gray.light};
    border-color: ${({ theme }) => theme.palette.divider};

    /* 入力エリアのみ無効化 */
    > :nth-child(2) {
      cursor: not-allowed;
      user-select: none;
      transition: all 0.2s ease;

      /* 共通のdisabledスタイル */
      &,
      input,
      button {
        color: ${({ theme }) => theme.palette.text.disabled};
        background-color: ${({ theme }) => theme.palette.gray.light};
      }

      input,
      button {
        cursor: not-allowed;
        pointer-events: none;
      }

      button svg {
        color: ${({ theme }) => theme.palette.text.disabled};
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
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
  outline-offset: -1px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.text.disabled : theme.palette.black};
  background: ${({ disabled, $variant = "light", theme }) => {
    if (disabled) return theme.palette.gray.light;
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  /* アイコンの色を制御 */
  svg {
    color: ${({ disabled, theme }) =>
      disabled ? theme.palette.text.disabled : "currentColor"};
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
