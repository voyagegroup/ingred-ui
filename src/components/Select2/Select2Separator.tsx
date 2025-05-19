import React from "react";

/**
 * Select2Separatorコンポーネント
 *
 * このコンポーネントはセパレータを表現します。
 * 内部的には何もレンダリングせず、Select2コンポーネントがこのコンポーネントを
 * 検出して、適切な方法でセパレータをレンダリングします。
 */
export const Select2Separator: React.FC = () => {
  // 何もレンダリングしない
  return null;
};

// コンポーネントの表示名を設定（デバッグ用）
Select2Separator.displayName = "Select2Separator";
