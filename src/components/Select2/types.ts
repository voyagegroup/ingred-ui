import { ComponentProps } from "react";
import { Theme } from "../../themes";

export type Select2Size = "small" | "medium" | "large";
export type Select2Variant = "default" | "light";

export interface Select2SizeConfig {
  height: string;
  fontSize: string;
  padding: string;
  iconSize: "sm" | "md" | "lg";
  borderRadius: string;
}

export const SELECT2_SIZES: Record<Select2Size, Select2SizeConfig> = {
  small: {
    height: "28px",
    fontSize: "12px",
    padding: "0 2px 0 6px",
    iconSize: "md",
    borderRadius: "4px",
  },
  medium: {
    height: "32px",
    fontSize: "13px",
    padding: "0 2px 0 6px",
    iconSize: "md",
    borderRadius: "6px",
  },
  large: {
    height: "40px",
    fontSize: "14px",
    padding: "0 4px 0 8px",
    iconSize: "md",
    borderRadius: "6px",
  },
} as const;

export interface Select2Option<T extends string | number = string> {
  /**
   * 選択肢の値
   */
  value: T;
  /**
   * 表示ラベル
   */
  label: string;
  /**
   * 無効状態
   */
  disabled?: boolean;
}

export interface Select2StyleProps {
  theme: Theme;
  $size: Select2Size;
  $variant: Select2Variant;
  $disabled?: boolean;
  $error?: boolean;
  $isOpen?: boolean;
  $hasValue?: boolean;
}

export interface Select2Props<T extends string | number = string> {
  /**
   * 選択肢の配列
   */
  options: Select2Option<T>[];
  /**
   * 選択された値
   */
  value?: T;
  /**
   * 値が変更された時のコールバック
   */
  onChange?: (value: T) => void;
  /**
   * コンポーネントのサイズ
   * @default "medium"
   */
  size?: Select2Size;
  /**
   * コンポーネントのバリアント
   * @default "default"
   */
  variant?: Select2Variant;
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
   * 検索機能の有効化
   * @default false
   */
  searchable?: boolean;
  /**
   * 検索入力のプレースホルダー
   * @default "検索..."
   */
  searchPlaceholder?: string;
  /**
   * エラー状態
   * @default false
   */
  error?: boolean;
  /**
   * メニューの最大高さ
   */
  maxMenuHeight?: number;
  /**
   * オプションが存在しない場合のメッセージ
   * @default "オプションがありません"
   */
  noOptionsMessage?: string;
  /**
   * カスタムクラス名
   */
  className?: string;
}
