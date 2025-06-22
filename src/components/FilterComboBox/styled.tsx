import styled from "styled-components";
import { getShadow } from "../../utils/getShadow";
import { palette } from "../../themes/palette";
import {
  FilterSize,
  FilterVariant,
  getFilterVariantConfig,
} from "../FilterInputAbstract/types";
import {
  ContextMenu2TextInputItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";

type StyledProps = {
  $size: FilterSize;
  $variant: FilterVariant;
};

export const Trigger = styled.button<StyledProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 6px;
  border: 0;
  outline-offset: -1px;
  background: transparent;
  cursor: pointer;

  &:focus {
    isolation: isolate;
    z-index: 1;
  }
`;

export const TriggerLabel = styled.span<{ $size: FilterSize }>`
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

export const TriggerIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
`;

export const ComboBoxPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  /* Drop shadow Common */
  box-shadow: ${getShadow(3, 0.08, palette.action.shadowBase)};
  z-index: 1000;
`;

export const ComboBoxPanel = styled.div`
  max-height: 200px;
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

export const ComboBoxInput = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.background.default};

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.icon.line};

    &:focus {
      border-color: #007bff;
    }
  }
`;

export const SelectContainer = styled.div<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  width: calc(100% + 46px);
  height: 100%;
  margin-left: -46px;
  background-color: ${({ $variant, theme }) => {
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0 32px 0 auto;
    display: block;
    width: 4px;
    opacity: 0;
    background: linear-gradient(
      90deg,
      rgba(4, 28, 51, 0),
      rgba(4, 28, 51, 0.16)
    );
    transition: opacity 0.2s;
    pointer-events: none;
  }

  &:where([data-overflowing="true"])::before {
    opacity: 1;
  }
`;

export const TagList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 4px;
  max-width: calc(100% - 78px);
  height: 100%;
  padding: 0 6px;
  margin-left: 46px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Select = styled.button<StyledProps>`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 54px;
  border: 0;
  background-color: ${({ $variant, theme }) => {
    const variantConfig = getFilterVariantConfig(theme);
    return variantConfig[$variant].background;
  }};
  outline-offset: -1px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    transition: color 0.2s ease;
  }
`;

export const SelectIcon = styled.span`
  flex-shrink: 0;
  width: 18px;
`;

export const StyledContextMenu2TextInputItem = styled(
  ContextMenu2TextInputItem,
)`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.background.default};

  input {
    &::placeholder {
      color: ${({ theme }) => theme.palette.icon.line};
    }
  }
`;

export const StyledContextMenu2ButtonControlsItem = styled(
  ContextMenu2ButtonControlsItem,
)`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-top: 1px solid ${({ theme }) => theme.palette.gray.main};
`;
