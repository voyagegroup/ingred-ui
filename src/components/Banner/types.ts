import * as React from "react";

export type BannerType = "info" | "warning" | "error";
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
