import styled from "styled-components";
import { colors } from "../../styles";
import { FilterSize } from "../FilterInputAbstract/types";
import { FILTER_VARIANTS } from "../FilterInputAbstract/styled";
import { ContextMenu2TextInputItem } from "../ContextMenu2";

type StyledProps = {
  $size: FilterSize;
  $variant: keyof typeof FILTER_VARIANTS;
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 54px;
  border: 0;
  background: ${({ $variant }) => FILTER_VARIANTS[$variant].background};
  outline-offset: -1px;
  text-align: left;
  color: ${colors.basic[900]};
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
      color: ${({ $placeholderColor }) =>
        $placeholderColor || colors.basic[600]};
    }
  }
`;
