import styled from "styled-components";
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
  background-color: ${({ theme, $variant, $disabled }) => {
    if ($disabled) return theme.palette.gray.light;
    return $variant === "light"
      ? theme.palette.background.default
      : theme.palette.basicDark.ultraLight;
  }};
  border: 1px solid
    ${({ theme, $error, $disabled }) => {
      if ($error) return theme.palette.danger.main;
      if ($disabled) return theme.palette.divider;
      return theme.palette.divider;
    }};
  border-radius: 6px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  /* disabled状態ではない場合のみhoverスタイルを適用 */
  &:hover:not([disabled]):not([data-disabled="true"]) {
    border-color: ${({ theme, $error, $disabled }) => {
      if ($disabled) return theme.palette.divider;
      if ($error) return theme.palette.danger.main;
      return theme.palette.primary.main;
    }};
  }

  ${({ theme, $isOpen, $error }) => $isOpen && theme.interaction.focus($error)}

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
  color: ${({ theme }) => theme.palette.text.disabled};
  padding: 0 6px;
`;

export const IconArea = styled.div<{
  $size?: Select2Size;
  $disabled?: boolean;
  $multiple?: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.palette.text.disabled : theme.palette.black};
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
      color: ${({ theme }) => theme.palette.icon.line};
    }
  }
`;

export const OptionsContainer = styled.div`
  max-height: 180px;
  overflow-y: auto;
`;
