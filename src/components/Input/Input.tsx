import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import { createChainedFunction } from "../../utils/createChainedFunction";
import { InputSize, InputVariant } from "./types";

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
  /**
   * 幅を明示的に指定
   */
  width?: string | number;
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
  const Element = multiline ? "textarea" : "input";

  // イベントハンドラ型を簡略化
  type InputEvent = React.SyntheticEvent<
    HTMLInputElement | HTMLTextAreaElement
  >;

  // フォーカスイベントハンドラの型エイリアス
  type FocusHandler = React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;

  const handleWheel = React.useCallback((event: InputEvent) => {
    event.currentTarget.blur();
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
      ref={ref as any}
      as={Element}
      $error={error}
      resize={resize}
      $size={size}
      $variant={variant}
      $fullWidth={fullWidth}
      onFocus={onFocus as FocusHandler}
      onBlur={onBlur as FocusHandler}
      onWheel={createChainedFunction(
        !multiline && "type" in rest && rest.type === "number"
          ? handleWheel
          : null,
        "onWheel" in rest ? rest.onWheel : undefined,
      )}
    />
  );
});

export default Input;
