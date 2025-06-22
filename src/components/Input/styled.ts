import styled from "styled-components";
import {
  InputSize,
  InputVariant,
  INPUT_SIZES,
  getInputVariantConfig,
  TEXTAREA_PADDING,
  getErrorStyles,
} from "./types";
import { focusInteraction } from "../../styles/interaction";

export const Input = styled.input<{
  $error: boolean;
  width?: string | number;
  resize?: string;
  $size?: InputSize;
  $variant?: InputVariant;
  $fullWidth?: boolean;
  $isFocused?: boolean;
  as?: string | React.ComponentType<any>;
}>`
  /* 幅設定 */
  width: ${({ width, $fullWidth }) => {
    if ($fullWidth) {
      return "100%";
    }
    if (width) {
      return `${isNaN(+width) ? width : width + "px"}`;
    }
    return "auto";
  }};

  /* サイズに基づくスタイル */
  height: ${({ $size = "medium", as }) =>
    as === "textarea" ? "auto" : INPUT_SIZES[$size].height};
  font-size: ${({ $size = "medium" }) => INPUT_SIZES[$size].fontSize};
  padding: ${({ $size = "medium", as }) =>
    as === "textarea" ? TEXTAREA_PADDING : INPUT_SIZES[$size].padding};
  border-radius: ${({ $size = "medium" }) => INPUT_SIZES[$size].borderRadius};

  /* バリアントに基づくスタイル */
  background-color: ${({ $error, $variant = "light", theme }) => {
    const variants = getInputVariantConfig(theme);
    return $error
      ? theme.palette.danger.highlight
      : variants[$variant].background;
  }};

  /* 共通スタイル */
  border: 1px solid
    ${({ $error, $variant = "light", $isFocused, theme }) => {
      const variants = getInputVariantConfig(theme);
      if ($error) return getErrorStyles(theme).borderColor;
      if ($isFocused) return variants[$variant].focusBorderColor;
      return variants[$variant].borderColor;
    }};
  color: ${({ theme }) => theme.palette.black};
  resize: ${({ resize }) => resize};

  /* MEMO: To take a place that display LastPass icon. */
  background-position: calc(100% - 35px) 50% !important;

  /* トランジション - Select2と同様 */
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  /* ホバー状態 */
  &:hover:not(:disabled) {
    border-color: ${({ $error, $variant = "light", theme }) => {
      const variants = getInputVariantConfig(theme);
      return $error
        ? getErrorStyles(theme).borderColor
        : variants[$variant].hoverBorderColor;
    }};
  }

  /* フォーカス状態 */
  &:focus {
    ${({ theme, $error }) => focusInteraction(theme, $error)}
  }

  /* プレースホルダー */
  &::placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
    transition: color 0.2s ease;
  }

  /* Edge用プレースホルダー */
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
    transition: color 0.2s ease;
  }

  /* 無効状態 */
  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    border-color: ${({ theme }) => theme.palette.divider};
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.gray.light};
    cursor: not-allowed;
  }
`;
