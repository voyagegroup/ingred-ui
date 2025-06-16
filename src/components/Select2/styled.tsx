import styled from "styled-components";
import { colors } from "../../styles";
import { Select2Size, Select2Props, SELECT2_SIZES } from "./types";
import { ContextMenu2TextInputItem } from "../ContextMenu2";
import { Tag } from "../Tag";

export const Select2Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectContainer = styled.div<{
  $size?: Select2Size;
  $variant?: Select2Props["variant"];
  $disabled?: boolean;
  $error?: boolean;
  $isOpen?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ $size = "medium" }) => SELECT2_SIZES[$size].height};
  background-color: ${({ $variant, $disabled }) => {
    if ($disabled) return colors.basic[200];
    return $variant === "light" ? colors.basic[0] : colors.basic[100];
  }};
  border: 1px solid
    ${({ $error, $disabled, $isOpen }) => {
      if ($error) return colors.red[500];
      if ($disabled) return colors.basic[400];
      if ($isOpen) return colors.blue[500];
      return colors.basic[400];
    }};
  border-radius: 6px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  /* disabled状態ではない場合のみhoverスタイルを適用 */
  &:hover:not([disabled]):not([data-disabled="true"]) {
    border-color: ${({ $error, $disabled }) => {
      if ($disabled) return colors.basic[400];
      if ($error) return colors.red[500];
      return colors.blue[500];
    }};
  }

  ${({ $isOpen, $error }) =>
    $isOpen &&
    `
    box-shadow: 0 0 0 3px ${
      $error ? `${colors.red[200]}66` : `${colors.blue[200]}66`
    };
  `}

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

export const SelectButton = styled.button<{
  $size: Select2Size;
  $variant?: Select2Props["variant"];
  $error?: boolean;
  $disabled?: boolean;
  $isOpen?: boolean;
  $hasValue?: boolean;
  $multiple?: boolean;
}>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: ${({ $multiple }) =>
    $multiple ? "flex-start" : "space-between"};
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: ${({ $size }) => SELECT2_SIZES[$size].fontSize};
  outline: none;
  border: none;
  background: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  z-index: ${({ $multiple }) => ($multiple ? 0 : 3)};
  transition: all 0.2s ease;
`;

export const InputArea = styled.div<{
  $size?: Select2Size;
  $variant?: Select2Props["variant"];
  $disabled?: boolean;
  $multiple?: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  z-index: ${({ $multiple }) => ($multiple ? "auto" : 0)};
  pointer-events: ${({ $multiple }) => ($multiple ? "auto" : "none")};
`;

export const SelectLabel = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  width: 100%;
  text-align: left;
`;

export const TagContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 4px;
  max-width: calc(100% - 32px);
  padding: 4px 6px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  z-index: 2;
  pointer-events: all;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 現状、追加のスタイリングは不要だが、将来的に必要になる可能性があるため
// コンポーネントとしては残しておく
export const StyledTag = styled(Tag)`
  // flex-shrink: 0;
  // margin: 0;
  // display: inline-flex;
  // align-self: center;
  // pointer-events: all;
`;

export const Placeholder = styled.span<{
  $variant?: Select2Props["variant"];
  $disabled?: boolean;
}>`
  color: ${colors.basic[400]};
  padding: 0 6px;
`;

export const IconArea = styled.div<{
  $size?: Select2Size;
  $disabled?: boolean;
  $multiple?: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${({ $disabled }) =>
    $disabled ? colors.basic[400] : colors.basic[900]};
  width: ${({ $size }) => ($size ? SELECT2_SIZES[$size].iconSize : "18px")};
  aspect-ratio: 1;
  margin-right: 8px;
  margin-left: ${({ $multiple }) => ($multiple ? "auto" : "0")};
  position: relative;
  z-index: 4;
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
  ContextMenu2TextInputItem,
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
