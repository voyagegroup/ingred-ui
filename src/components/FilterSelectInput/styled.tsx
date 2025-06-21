import styled from "styled-components";
import {
  FilterSize,
  FilterVariant,
  getFilterVariantConfig,
} from "../FilterInputAbstract/types";
import { ContextMenu2TextInputItem } from "../ContextMenu2";

type StyledProps = {
  $size: FilterSize;
  $variant: FilterVariant;
};

export const SelectContainer = styled.div`
  min-width: 0;
  width: calc(100% + 46px);
  height: 100%;
  margin-left: -46px;
`;

export const Select = styled.button<StyledProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 54px;
  border: 0;
  background: ${({ $variant, theme }) => {
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};
  outline-offset: -1px;
  text-align: left;
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;

  &:focus {
    isolation: isolate;
    z-index: 1;
  }
`;

type SelectLabelProps = {
  $size: FilterSize;
};

export const SelectLabel = styled.span<SelectLabelProps>`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "12px";
      case "medium":
        return "13px";
      case "large":
        return "14px";
    }
  }};
`;

export const SelectIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
`;

type StyledContextMenu2TextInputItemProps = {
  $placeholderColor?: string;
};

export const StyledContextMenu2TextInputItem = styled(
  ContextMenu2TextInputItem,
)<StyledContextMenu2TextInputItemProps>`
  input {
    &::placeholder {
      color: ${({ $placeholderColor, theme }) =>
        $placeholderColor || theme.palette.icon.line};
    }
  }
`;

export const StyledTrigger = styled.button<{
  $isOpen?: boolean;
  $placeholder?: boolean;
  $placeholderColor?: string;
  $size: "small" | "medium" | "large";
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  padding-left: 6px;
  background: transparent;
  text-align: left;
  overflow: hidden;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  /* リストが表示されているときの矢印アニメーション */
  .arrow-down {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.2s ease;
  }

  .select-content {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow: hidden;
    font-size: 13px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.black};
  }

  /* プレースホルダー表示 */
  .placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    color: ${({ $placeholderColor, theme }) =>
      $placeholderColor || theme.palette.icon.line};
  }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .arrow-container {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    pointer-events: none;
  }
`;

export const SelectPanelInner = styled.div`
  max-height: 180px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const SelectPanelContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  /* Drop shadow Common */
  box-shadow: 0px 0px 16px rgba(4, 28, 51, 0.08);
  z-index: 1000;

  ${SelectPanelInner}:not(:last-child) {
    border-top: 1px solid ${({ theme }) => theme.palette.gray.main};
  }
`;
