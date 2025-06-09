import { Theme } from "../../themes";
import React from "react";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "basic";

export type BadgeType = "normal" | "pill" | "signal";

export type BadgeSize = "medium" | "small";

export type BadgeProps = React.ComponentPropsWithoutRef<"a" | "span"> & {
  /**
   * バッジの色
   */
  color: BadgeColor;
  /**
   * バッジのタイプ
   * @default "normal"
   */
  type?: BadgeType;
  /**
   * フォントサイズ
   * @default "13px"
   */
  fontSize?: string;
  /**
   * フォントの太さ
   * @default "normal"
   */
  fontWeight?: string;
  /**
   * 使用するHTML要素
   * @default "span"
   */
  component?: "span" | "a";
  /**
   * バッジのサイズ
   * @default "medium"
   */
  size?: BadgeSize;
  /**
   * アイコン要素
   */
  icon?: React.ReactNode;
}; 