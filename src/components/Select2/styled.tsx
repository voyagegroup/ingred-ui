import styled from "styled-components";
import { colors } from "../../styles";
import { Select2Size, Select2Props, SELECT2_SIZES } from "./types";
import { ContextMenu2TextInputItem } from "../ContextMenu2";

export const Select2Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectButton = styled.button<{
  $size: Select2Size;
  $variant?: Select2Props["variant"];
  $error?: boolean;
  $disabled?: boolean;
  $isOpen?: boolean;
  $hasValue?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: ${({ $size }) => SELECT2_SIZES[$size].minHeight};
  padding: ${({ $size }) => SELECT2_SIZES[$size].padding};
  font-size: ${({ $size }) => SELECT2_SIZES[$size].fontSize};
  outline: none;
  border: none;
  background: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: ${({ $size }) => SELECT2_SIZES[$size].borderRadius};
  border: 1px solid
    ${({ $error, $disabled, $isOpen }) => {
      if ($error) return colors.red[500];
      if ($disabled) return colors.basic[400];
      if ($isOpen) return colors.blue[500];
      return colors.basic[400];
    }};
  background-color: ${({ $variant, $disabled }) => {
    if ($disabled) return colors.basic[200];
    return $variant === "light" ? colors.basic[0] : colors.basic[100];
  }};
 
  text-align: left;

  &:hover:not(:disabled) {
    border-color: ${({ $error }) => {
      if ($error) return colors.red[500];
      return colors.blue[500];
    }};
  }

  ${({ $isOpen, $error }) =>
    $isOpen &&
    `
    box-shadow: 0 0 0 3px ${
      $error
        ? `${colors.red[200]}66`
        : `${colors.blue[200]}66`
    };
  `}

  transition: all 0.2s ease;
`;

export const InputArea = styled.div<{
  $size?: Select2Size;
  $variant?: Select2Props["variant"];
  $disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const SelectLabel = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Placeholder = styled.span<{
  $variant?: Select2Props["variant"];
  $disabled?: boolean;
}>`
  color: ${({ $disabled }) =>
    $disabled ? colors.basic[400] : colors.basic[900]};
`;

export const IconArea = styled.div<{
  $size?: Select2Size;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${({ $disabled }) => 
    $disabled ? colors.basic[400] : colors.basic[900]};
  width: ${({ $size }) => $size ? SELECT2_SIZES[$size].iconSize : "18px"};
  aspect-ratio: 1;
  svg {
    width: 100%;
    height: 100%;
  }
    span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const StyledContextMenu2TextInputItem = styled(
  ContextMenu2TextInputItem
)`
  input {
    &::placeholder {
      color: ${colors.basic[600]};
    }
  }
`;

export const OptionsContainer = styled.div`
  max-height: 180px;
  overflow-y: auto;
`;

export const ErrorMessage = styled.span`
  color: ${colors.red[500]};
  font-size: 14px;
  margin-top: 4px;
`;