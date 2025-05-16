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
   * 子要素（表示ラベル）
   */
  children: React.ReactNode;
};

/**
 * Select2の選択肢を表すコンポーネント
 */
export const Select2Option = React.forwardRef<
  HTMLDivElement,
  Select2OptionProps & React.HTMLAttributes<HTMLDivElement>
>(({ value, disabled, children, ...props }, ref) => {
  return (
    <div ref={ref} data-value={value} data-disabled={disabled} {...props}>
      {children}
    </div>
  );
});

Select2Option.displayName = "Select2Option"; 