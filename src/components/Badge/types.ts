import React from "react";
import { Theme } from "../../themes";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "basic";

export type BadgeType = "normal" | "pill" | "signal";

export type BadgeSize = "medium" | "small";

// サイズの定数定義
export const BADGE_SIZE = {
  small: {
    iconSize: 14,
    height: "22px",
    pillHeight: "20px",
    gap: "2px",
    padding: (theme: Theme) => `${theme.spacing * 0.75}px`,
    signalPadding: (theme: Theme) => `${theme.spacing / 2}px`,
    signalGap: (theme: Theme) => `${theme.spacing / 2}px`,
    dotSize: "10px",
    fontSize: "12px",
  },
  medium: {
    iconSize: 16,
    height: "24px",
    pillHeight: "24px",
    gap: "4px",
    padding: (theme: Theme) => `${theme.spacing}px`,
    signalPadding: (theme: Theme) => `${theme.spacing * 0.75}px`,
    signalGap: (theme: Theme) => `${theme.spacing * 0.75}px`,
    dotSize: "12px",
    fontSize: "13px",
  },
};

// カラーマップの定義
export const BACKGROUND_COLOR_MAP = {
  normal: {
    primary: (theme: Theme) => theme.palette.primary.highlight,
    secondary: (theme: Theme) => theme.palette.basicDark.dark,
    success: (theme: Theme) =>
      theme.palette.success.softlight || theme.palette.success.light,
    warning: (theme: Theme) => theme.palette.warning.highlight,
    danger: (theme: Theme) => theme.palette.danger.highlight,
    basic: (theme: Theme) => theme.palette.black,
  },
  pill: {
    primary: (theme: Theme) => theme.palette.primary.main,
    secondary: (theme: Theme) => theme.palette.basicDark.light,
    success: (theme: Theme) => theme.palette.success.main,
    warning: (theme: Theme) => theme.palette.warning.main,
    danger: (theme: Theme) => theme.palette.danger.main,
    basic: (theme: Theme) => theme.palette.black,
  },
  signal: {
    primary: (theme: Theme) => theme.palette.primary.main,
    secondary: (theme: Theme) => theme.palette.gray.dark,
    success: (theme: Theme) => theme.palette.success.main,
    warning: (theme: Theme) => theme.palette.warning.main,
    danger: (theme: Theme) => theme.palette.danger.main,
    basic: (theme: Theme) => theme.palette.black,
  },
};

export const TEXT_COLOR_MAP = {
  normal: {
    primary: (theme: Theme) => theme.palette.text.primary,
    secondary: (theme: Theme) => theme.palette.text.secondary,
    success: (theme: Theme) => theme.palette.success.deepDark,
    warning: (theme: Theme) => theme.palette.warning.deepDark,
    danger: (theme: Theme) => theme.palette.danger.deepDark,
    basic: (theme: Theme) => theme.palette.text.white,
  },
  pill: {
    primary: (theme: Theme) => theme.palette.text.white,
    secondary: (theme: Theme) => theme.palette.text.secondary,
    success: (theme: Theme) => theme.palette.text.white,
    warning: (theme: Theme) => theme.palette.warning.deepDark,
    danger: (theme: Theme) => theme.palette.text.white,
    basic: (theme: Theme) => theme.palette.text.white,
  },
  signal: {
    primary: (theme: Theme) => theme.palette.text.primary,
    secondary: (theme: Theme) => theme.palette.text.secondary,
    success: (theme: Theme) => theme.palette.success.deepDark,
    warning: (theme: Theme) => theme.palette.warning.deepDark,
    danger: (theme: Theme) => theme.palette.danger.deepDark,
    basic: (theme: Theme) => theme.palette.text.primary,
  },
};

// 背景色の決定ロジック
export const getBackgroundColor = (
  key: BadgeColor,
  theme: Theme,
  type: BadgeType,
): string => {
  return BACKGROUND_COLOR_MAP[type][key](theme);
};

// テキスト色の決定ロジック
export const getTextColor = (
  key: BadgeColor,
  theme: Theme,
  type: BadgeType,
): string => {
  return TEXT_COLOR_MAP[type][key](theme);
};

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
