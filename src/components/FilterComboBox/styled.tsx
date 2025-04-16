import styled from "styled-components";
import { colors } from "../../styles";
import { FILTER_VARIANTS, FilterVariant } from "../FilterInputAbstract/types";
import { ContextMenu2TextInputItem, ContextMenu2ButtonControlsItem } from "../ContextMenu2";

type StyledProps = {
  $variant: FilterVariant;
};

export const SelectContainer = styled.div<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  width: calc(100% + 46px);
  height: 100%;
  margin-left: -46px;
  background-color: ${({ $variant }) => FILTER_VARIANTS[$variant].background};

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
  background-color: ${({ $variant }) => FILTER_VARIANTS[$variant].background};
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
  background-color: ${colors.basic[0]};

  input {
    &::placeholder {
      color: ${colors.basic[600]};
    }
  }
`;

export const StyledContextMenu2ButtonControlsItem = styled(
  ContextMenu2ButtonControlsItem,
)`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: ${colors.basic[0]};
  border-top: 1px solid ${colors.basic[300]};
`;
