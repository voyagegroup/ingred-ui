import React from "react";

// 確認ダイアログの設定型
export type ConfirmCloseConfig = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  buttonColor?:
    | "primary"
    | "primaryPale"
    | "basicLight"
    | "basicDark"
    | "danger"
    | "clear";
};

// Drawerコンポーネントのプロパティ型
export type DrawerProps = {
  isOpen: boolean;
  direction: "left" | "right" | "bottom";
  onClose?: (reason: "backdropClick" | "escapeKey") => void;
  size?: string | number; // 数値(400)はpx、文字列は単位必須("400px", "30vw", "25%")
  resizable?: boolean; // リサイズ可能かどうか
  minSize?: string | number; // 数値(200)はpx、文字列は単位必須
  maxSize?: string | number; // 数値(800)はpx、文字列は単位必須
  onResize?: (newSize: number) => void; // リサイズ時のコールバック（常にpx値）
  stickyHeader?: React.ReactNode; // スクロール時も上部に固定されるヘッダー
  stickyFooter?: React.ReactNode; // スクロール時も下部に固定されるフッター
  confirmOnClose?: string | ConfirmCloseConfig; // 閉じる前に確認ダイアログを表示
  children: React.ReactNode;
};

// 閉じる理由の型
export type CloseReason = "backdropClick" | "escapeKey";
