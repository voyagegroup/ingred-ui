import React from "react";
import type { Theme } from "../../../themes/createTheme";

/**
 * アイコンの色を動的に変更するヘルパー関数
 *
 * @param originalIcon - 元のアイコンReactNode
 * @param dynamicIconColor - 動的色設定オブジェクト
 * @param isEnabled - 有効状態（通常はcheckedRows.length > 0）
 * @param theme - テーマオブジェクト
 * @returns 色が適用されたアイコン
 */
export const getDynamicIcon = (
  originalIcon: React.ReactNode,
  dynamicIconColor: { enabled: string; disabled?: string } | undefined,
  isEnabled: boolean,
  theme: Theme,
) => {
  // dynamicIconColorが指定されている場合、選択状態に応じて色を変更
  if (dynamicIconColor && React.isValidElement(originalIcon)) {
    let targetColor = isEnabled
      ? dynamicIconColor.enabled
      : dynamicIconColor.disabled || "currentColor";

    // テーマの色を解決
    if (targetColor === "success") {
      targetColor = theme.palette.success.main;
    } else if (targetColor === "danger") {
      targetColor = theme.palette.danger.main;
    } else if (targetColor === "primary") {
      targetColor = theme.palette.primary.main;
    } else if (targetColor === "warning") {
      targetColor = theme.palette.warning.main;
    }
    // currentColorやその他のCSS色値はそのまま使用

    return React.cloneElement(originalIcon, {
      ...originalIcon.props,
      color: targetColor,
    });
  }
  return originalIcon;
};

/**
 * TableActionのenabledWhenに基づいてアクションを分類
 *
 * @param actions - TableActionの配列
 * @returns checked用とunchecked用に分離されたアクション
 */
export const categorizeActionsByEnabledWhen = <
  T extends { enabledWhen?: "checked" | "unchecked" | "custom" },
>(
  actions: T[],
) => {
  const checkedActions = actions.filter((action) => {
    return action.enabledWhen === "checked" || action.enabledWhen === undefined;
  });
  const uncheckedActions = actions.filter((action) => {
    return action.enabledWhen === "unchecked";
  });

  return { checkedActions, uncheckedActions };
};

/**
 * TableActionのdisplayInに基づいてアクションを分類
 *
 * @param actions - TableActionの配列
 * @returns toolbar用とdropdown用に分離されたアクション
 */
export const categorizeActionsByDisplayIn = <
  T extends { displayIn?: "toolbar" | "dropdown" },
>(
  actions: T[],
) => {
  const toolbarActions = actions.filter((action) => {
    return (action.displayIn ?? "toolbar") === "toolbar";
  });
  const dropdownActions = actions.filter((action) => {
    return (action.displayIn ?? "toolbar") === "dropdown";
  });

  return { toolbarActions, dropdownActions };
};
