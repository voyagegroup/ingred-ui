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

// ... 他のexportは変更なし ... 