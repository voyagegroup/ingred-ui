import styled, { css } from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2CheckItem } from "../ContextMenu2/ContextMenu2CheckItem";
import { FilterSize, FILTER_SIZES } from "./types";

// フィルターのベーススタイル
export const filterBaseStyle = css`
  border: 1px solid ${colors.basic[400]};
  background-color: #fff;
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

export type FilterTagProps = {
  $size: FilterSize;
};

export const FilterInputAbstract = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0;
  ${filterBaseStyle}
  overflow: hidden;

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
    background-color: transparent;
  }
`;

export const DropDownTrigger = styled.button`
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
  color: #000;
  background: #fff;
  cursor: pointer;

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

export const FilterTag = styled.span<FilterTagProps>`
  isolation: isolate;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "2px 4px 2px 6px";
      case "medium":
        return "2px 5px 2px 7px";
      case "large":
        return "3px 6px 3px 8px";
    }
  }};
  border: 1px solid ${colors.basic[400]};
  border-radius: 2px;
  font-weight: 400;
  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "11px";
      case "medium":
        return "12px";
      case "large":
        return "13px";
    }
  }};
  line-height: 14px;
  word-break: break-all;
  color: ${colors.basic[900]};
  background-color: #fff;
`;

export const FilterTagButton = styled.button<FilterTagProps>`
  flex-shrink: 0;
  height: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "14px";
      case "medium":
        return "16px";
      case "large":
        return "18px";
    }
  }};
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  color: ${colors.basic[900]};
  background-color: transparent;
  cursor: pointer;

  /* アイコンのサイズ調整 */
  svg {
    width: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "14px";
      case "medium":
        return "16px";
      case "large":
        return "18px";
    }
  }};
    height: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "14px";
      case "medium":
        return "16px";
      case "large":
        return "18px";
    }
  }};
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
