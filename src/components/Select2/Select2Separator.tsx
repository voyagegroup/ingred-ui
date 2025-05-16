import React from "react";
import { ContextMenu2SeparatorItem } from "../ContextMenu2";

/**
 * Select2Separatorコンポーネント
 *
 * Select2コンポーネント内で使用することを想定しています。
 * オプショングループ間のセパレータとして機能します。
 */
export const Select2Separator: React.FC = () => {
  return <ContextMenu2SeparatorItem />;
};

// コンポーネントの表示名を設定（デバッグ用）
Select2Separator.displayName = "Select2Separator"; 