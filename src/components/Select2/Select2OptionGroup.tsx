import React from "react";

export type Select2OptionGroupProps = {
  /**
   * グループのラベル
   */
  label: string;
  /**
   * 子要素（グループに含まれる選択肢）
   */
  children: React.ReactNode;
};

/**
 * Select2の選択肢グループを表すコンポーネント
 */
export const Select2OptionGroup = React.forwardRef<
  HTMLDivElement,
  Select2OptionGroupProps & React.HTMLAttributes<HTMLDivElement>
>(({ label, children, ...props }, ref) => {
  return (
    <div ref={ref} data-group-label={label} {...props}>
      {children}
    </div>
  );
});

Select2OptionGroup.displayName = "Select2OptionGroup"; 