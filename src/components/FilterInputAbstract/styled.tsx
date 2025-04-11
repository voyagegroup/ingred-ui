import styled from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2CheckItem } from "../ContextMenu2/ContextMenu2CheckItem";

//
// -----------------------------------------------------------------------------

export const FilterTag = styled.span`
  isolation: isolate;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: 1px 4px 1px 6px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 2px;
  /* UI/Text 12 */
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  word-break: break-all;
  color: ${colors.basic[900]};
  background-color: #fff;
`;

export const FilterTagButton = styled.button`
  flex-shrink: 0;
  height: 18px;
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  zoom: ${16 / 18};
  color: ${colors.basic[900]};
  background-color: transparent;
  cursor: pointer;
`;

//
// -----------------------------------------------------------------------------

export const FilterInputAbstract = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0;
  border-radius: 4px;
  border: 1px solid ${colors.basic[400]};
  background-color: #fff;
  overflow: hidden;

  &[data-size="small"] {
    height: 28px;
    border-radius: 4px;
  }

  &[data-size="medium"] {
    height: 32px;
    border-radius: 6px;
  }

  &[data-size="large"] {
    height: 40px;
    border-radius: 6px;
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
  padding: 0 2px 0 6px;
  border: 0;
  border-right: 1px solid ${colors.basic[400]};
  outline-offset: -1px;
  color: #000;
  background: #fff;
  cursor: pointer;

  /* サイズバリエーション */
  &:where(${FilterInputAbstract}[data-size="small"] *) {
    /* 左側のアイコン */
    span:first-child {
      width: 20px;
      height: 20px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    /* 右側の矢印アイコン */
    span:last-child {
      width: 16px;
      height: 16px;
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &:where(${FilterInputAbstract}[data-size="medium"] *) {
    /* 左側のアイコン */
    span:first-child {
      width: 22px;
      height: 22px;
      svg {
        width: 22px;
        height: 22px;
      }
    }
    /* 右側の矢印アイコン */
    span:last-child {
      width: 18px;
      height: 18px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  &:where(${FilterInputAbstract}[data-size="large"] *) {
    padding: 0 4px 0 8px;
    /* 左側のアイコン */
    span:first-child {
      width: 24px;
      height: 24px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    /* 右側の矢印アイコン */
    span:last-child {
      width: 20px;
      height: 20px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
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
