import React, { ReactNode } from "react";

export type Select2OptionGroupProps = {
  /**
   * グループのラベル
   */
  label: string;
  /**
   * 子要素（Select2Option）
   */
  children: ReactNode;
};

/**
 * Select2OptionGroupコンポーネント
 * 
 * このコンポーネントはグループ化された選択肢を表現します。
 * 内部的には何もレンダリングせず、Select2コンポーネントがこのコンポーネントの
 * プロパティを取得して、適切な方法でレンダリングします。
 */
export const Select2OptionGroup: React.FC<Select2OptionGroupProps> = (_props) => {
  // 何もレンダリングしない
  return null;
};

// コンポーネントの表示名を設定（デバッグ用）
Select2OptionGroup.displayName = "Select2OptionGroup"; 