import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import { createChainedFunction } from "../../utils/createChainedFunction";
import {
  InputSize,
  InputVariant,
  getInputVariantConfig,
  getErrorStyles,
} from "./types";
import { ThemeContext } from "styled-components";

export type InputProps = (
  | React.ComponentPropsWithoutRef<"input">
  | React.ComponentPropsWithoutRef<"textarea">
) & {
  /**
   * 入力タイプ
   */
  type?: string;
  /**
   * エラー状態
   * @default false
   */
  error?: boolean;
  /**
   * マルチライン入力（テキストエリア）
   * @default false
   */
  multiline?: boolean;
  /**
   * テキストエリアのリサイズ設定
   * @default "both"
   */
  resize?: Property.Resize;
  /**
   * コンポーネントのサイズ
   * @default "medium"
   */
  size?: InputSize;
  /**
   * コンポーネントのバリアント
   * @default "light"
   */
  variant?: InputVariant;
  /**
   * 幅を親要素に合わせる
   * @default false
   */
  fullWidth?: boolean;
  /**
   * エラーメッセージ（アクセシビリティ用）
   */
  errorMessage?: string;
};

const Input = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputProps
>(function Input(
  {
    error = false,
    multiline = false,
    resize = "both",
    size = "medium",
    variant = "light",
    fullWidth = false,
    errorMessage,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const [isFocused, setIsFocused] = React.useState(false);
  const Element = multiline ? "textarea" : "input";

  // テーマベースの設定をメモ化（将来的にはstyled-componentに統合）
  const theme = React.useContext(ThemeContext);
  React.useMemo(() => (theme ? getInputVariantConfig(theme) : null), [theme]);

  React.useMemo(() => (theme ? getErrorStyles(theme) : null), [theme]);

  // イベントハンドラ型を簡略化
  type InputEvent = React.SyntheticEvent<
    HTMLInputElement | HTMLTextAreaElement
  >;

  const handleWheel = React.useCallback((event: InputEvent) => {
    event.currentTarget.blur();
  }, []);

  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
  }, []);

  // アクセシビリティのためのプロパティ
  const ariaProps = error
    ? {
        "aria-invalid": true,
        ...(errorMessage && { "aria-errormessage": errorMessage }),
      }
    : {};

  return (
    <Styled.Input
      {...rest}
      {...ariaProps}
      ref={ref as any} // ジェネリック型の制約のため、ここではanyを使用
      as={Element}
      $error={error}
      $isFocused={isFocused}
      resize={resize}
      $size={size}
      $variant={variant}
      $fullWidth={fullWidth}
      onFocus={
        onFocus ? createChainedFunction(handleFocus, onFocus) : handleFocus
      }
      onBlur={onBlur ? createChainedFunction(handleBlur, onBlur) : handleBlur}
      onWheel={createChainedFunction(
        rest.type === "number" ? handleWheel : null,
        rest.onWheel,
      )}
    />
  );
});

export default Input;
