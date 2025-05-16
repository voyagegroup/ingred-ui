import React, { ReactNode } from "react";
import { ContextMenu2HeadingItem } from "../ContextMenu2";

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
 * Select2コンポーネント内で使用することを想定しています。
 * オプションをグループ化するためのコンポーネントです。
 */
export const Select2OptionGroup: React.FC<Select2OptionGroupProps> = ({ label, children }) => {
  return (
    <>
      <ContextMenu2HeadingItem>{label}</ContextMenu2HeadingItem>
      {children}
    </>
  );
};

// コンポーネントの表示名を設定（デバッグ用）
Select2OptionGroup.displayName = "Select2OptionGroup"; 