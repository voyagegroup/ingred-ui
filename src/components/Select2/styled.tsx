import styled from "styled-components";
import { colors } from "../../styles";
import { Select2Size, Select2Props } from "./types";
import { ContextMenu2TextInputItem } from "../ContextMenu2";

export type SizeStyle = {
  minHeight: string;
  padding: string;
  fontSize: string;
  iconSize: string;
};

export const getSizeStyle = (size: Select2Size): SizeStyle => {
  switch (size) {
    case "small":
      return {
        minHeight: "32px",
        padding: "4px 8px",
        fontSize: "14px",
        iconSize: "14px",
      };
    case "large":
      return {
        minHeight: "48px",
        padding: "12px 16px",
        fontSize: "16px",
        iconSize: "16px",
      };
    case "medium":
    default:
      return {
        minHeight: "40px",
        padding: "8px 12px",
        fontSize: "14px",
        iconSize: "14px",
      };
  }
};

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
  min-height: ${({ $size }) => getSizeStyle($size).minHeight};
  padding: ${({ $size }) => getSizeStyle($size).padding};
  font-size: ${({ $size }) => getSizeStyle($size).fontSize};
  outline: none;
  border: none;
  background: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: ${({ theme }) => theme.radius}px;
  border: 1px solid
    ${({ $error, $disabled, $isOpen }) => {
      if ($error) return colors.red[500];
      if ($disabled) return colors.basic[400];
      if ($isOpen) return colors.blue[500];
      return colors.basic[400];
    }};
  background-color: ${({ $variant, $disabled }) => {
    if ($disabled) return colors.basic[100];
    return $variant === "light" ? colors.basic[0] : colors.basic[100];
  }};
  color: ${({ $disabled }) =>
    $disabled ? colors.basic[500] : colors.basic[900]};
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
        ? `${colors.red[500]}33`
        : `${colors.blue[500]}33`
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
}>`
  color: ${colors.basic[600]};
`;

export const IconArea = styled.div<{
  size?: Select2Size;
}>`
  display: flex;
  align-items: center;
  font-size: ${({ size }) => (size ? getSizeStyle(size).iconSize : "14px")};
  color: ${colors.basic[700]};
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  padding: 0;
  color: ${colors.basic[900]};
  font-family: inherit;

  &::placeholder {
    color: ${colors.basic[600]};
  }

  &:disabled {
    cursor: not-allowed;
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