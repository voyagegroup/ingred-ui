import React from "react";

export type Select2OptionProps = {
  /**
   * 選択肢の値
   */
  value: string | number;
  /**
   * 無効状態
   */
  disabled?: boolean;
  /**
   * 表示するラベル
   */
  children: React.ReactNode;
};

/**
 * Select2Optionコンポーネント
 *
 * Select2コンポーネント内で使用することを想定しています。
 * 実際に何かをレンダリングせず、Select2の選択肢として登録するための宣言的なコンポーネントです。
 */
export const Select2Option: React.FC<Select2OptionProps> = (_props) => {
  // 実際には何もレンダリングしない
  // この情報はSelect2コンポーネントによって使用される
  return null;
};

// コンポーネントの表示名を設定（デバッグ用）
Select2Option.displayName = "Select2Option";
