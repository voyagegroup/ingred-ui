import { Theme } from "../../themes";
import React from "react";

export type Select2Size = "small" | "medium" | "large";
export type Select2Variant = "light" | "dark";

export type Select2SizeConfig = {
  fontSize: string;
  padding: string;
  iconSize: string;
  borderRadius: string;
  height: string;
};

export const SELECT2_SIZES: Record<Select2Size, Select2SizeConfig> = {
  small: {
    fontSize: "12px",
    padding: "0 6px 0 6px",
    iconSize: "16px",
    borderRadius: "4px",
    height: "28px",
  },
  medium: {
    fontSize: "13px",
    padding: "0 8px 0 8px",
    iconSize: "18px",
    borderRadius: "6px",
    height: "32px",
  },
  large: {
    fontSize: "14px",
    padding: "0 10px 0 10px",
    iconSize: "20px",
    borderRadius: "6px",
    height: "40px",
  },
} as const;

export type Select2Option = {
  /**
   * 選択肢の値
   */
  value: string | number;
  /**
   * 表示ラベル
   */
  label: string;
  /**
   * 無効状態
   */
  disabled?: boolean;
};

export type Select2StyleProps = {
  theme: Theme;
  $size: Select2Size;
  $variant: Select2Variant;
  $disabled?: boolean;
  $error?: boolean;
  $isOpen?: boolean;
  $hasValue?: boolean;
};

export type Select2Props = {
  /**
   * 選択肢の配列
   */
  options: Select2Option[];
  /**
   * 選択された値。multipleがtrueの場合は配列、falseの場合は単一の値
   */
  value?: string | number | (string | number)[];
  /**
   * 値が変更された時のコールバック
   */
  onChange?:
    | ((value: string | number) => void)
    | ((values: (string | number)[]) => void);
  /**
   * 複数選択モード
   * @default false
   */
  multiple?: boolean;
  /**
   * コンポーネントのサイズ
   * @default "medium"
   */
  size?: Select2Size;
  /**
   * コンポーネントのバリアント
   * @default "light"
   */
  variant?: Select2Variant;
  /**
   * タグのバリアント（複数選択時）
   * @default 指定がない場合、Select2のvariantに応じて自動的に決定されます。
   * variant="light"の場合はdark、variant="dark"の場合はlightが適用されます。
   */
  tagVariant?: Select2Variant;
  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;
  /**
   * プレースホルダー
   * @default "選択してください"
   */
  placeholder?: string;
  /**
   * 検索機能を有効にするかどうか
   * @default false
   */
  searchable?: boolean;
  /**
   * 検索入力のプレースホルダー
   * searchableがtrueの場合のみ使用されます
   * @default "検索"
   */
  searchPlaceholder?: string;
  /**
   * 検索結果がない場合のメッセージ
   * searchableがtrueの場合のみ使用されます
   * @default "オプションがありません"
   */
  noResultsMessage?: string;
  /**
   * エラー状態
   * @default false
   *
   * 注意: エラーメッセージの表示はコンポーネント側では行われません。
   * エラーメッセージはプロダクト側で実装してください。
   */
  error?: boolean;
  /**
   * 適用ボタンのテキスト (multipleがtrueの場合のみ使用)
   * @default "適用"
   */
  applyButtonText?: string;
  /**
   * キャンセルボタンのテキスト (multipleがtrueの場合のみ使用)
   * @default "キャンセル"
   */
  cancelButtonText?: string;
  /**
   * 子要素（宣言的API用）
   * Select2Option、ContextMenu2HeadingItem、ContextMenu2SeparatorItemなどを指定できます
   */
  children?: React.ReactNode;
};
