import * as React from "react";

/**
 * バナーのタイプを定義します
 * info: 情報提供用
 * warning: 警告用
 * error: エラー用
 */
export type BannerType = "info" | "warning" | "error";

/**
 * バナーのサイズを定義します
 * small: 小さいサイズ
 * medium: 中サイズ（デフォルト）
 */
export type BannerSize = "small" | "medium";

export type BannerProps = {
  /**
   * バナーのタイプ
   * @default "info"
   */
  type?: BannerType;
  /**
   * バナーのサイズ
   * @default "medium"
   */
  size?: BannerSize;
  /**
   * バナーに表示するメッセージ（childrenと併用する場合はこちらが優先されます）
   */
  message?: React.ReactNode;
  /**
   * バナーの内容（messageと併用する場合はmessageが優先されます）
   */
  children?: React.ReactNode;
  /**
   * 追加のCSSクラス
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
