import React from "react";
import type { Theme } from "../../../themes/createTheme";
import type { TableAction } from "../types/tableActions";

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
export const categorizeActionsByEnabledWhen = (actions: TableAction[]) => {
  const checkedActions = actions.filter((action) => {
    // enabledWhenプロパティが存在しない型もあるため、安全にアクセス
    const enabledWhen =
      "enabledWhen" in action ? action.enabledWhen : undefined;
    return enabledWhen === "checked" || enabledWhen === undefined;
  });
  const uncheckedActions = actions.filter((action) => {
    const enabledWhen =
      "enabledWhen" in action ? action.enabledWhen : undefined;
    return enabledWhen === "unchecked";
  });

  return { checkedActions, uncheckedActions };
};

/**
 * TableActionのdisplayInに基づいてアクションを分類
 *
 * @param actions - TableActionの配列
 * @returns toolbar用とdropdown用に分離されたアクション
 */
export const categorizeActionsByDisplayIn = (actions: TableAction[]) => {
  const toolbarActions = actions.filter((action) => {
    // displayInプロパティが存在しない型もあるため、安全にアクセス
    const displayIn = "displayIn" in action ? action.displayIn : undefined;
    return (displayIn ?? "toolbar") === "toolbar";
  });
  const dropdownActions = actions.filter((action) => {
    const displayIn = "displayIn" in action ? action.displayIn : undefined;
    return (displayIn ?? "toolbar") === "dropdown";
  });

  return { toolbarActions, dropdownActions };
};

/**
 * enabledWhenとcustomDisabled関数に基づいてアクションが無効かどうかを判定
 *
 * @param action - 判定対象のアクションまたはアイテム
 * @param checkedRows - 現在選択されている行の配列
 * @param isUncheckedContext - unchecked系アクション専用のコンテキストかどうか
 * @returns アクションが無効かどうか
 */
export const isActionDisabled = (
  action: {
    enabledWhen?: "checked" | "unchecked" | "custom";
    disabled?: (checkedRows: string[]) => boolean;
  },
  checkedRows: string[],
  isUncheckedContext = false,
): boolean => {
  // unchecked系コンテキストの場合、選択状態があると無効
  if (isUncheckedContext) {
    return checkedRows.length > 0;
  }

  // 通常のコンテキストでの判定
  if (action.enabledWhen === "checked" || action.enabledWhen === undefined) {
    return checkedRows.length === 0;
  } else if (action.enabledWhen === "unchecked") {
    return checkedRows.length > 0;
  } else if (action.enabledWhen === "custom") {
    return action.disabled?.(checkedRows) ?? false;
  }

  return false;
};

/**
 * TableActionのキーを生成するヘルパー関数
 *
 * @param action - TableAction
 * @param index - 配列内のインデックス
 * @returns ユニークなキー文字列
 */
export const getActionKey = (action: TableAction, index: number): string => {
  if (action.type === "singleButton") {
    return `single-${action.label || `action-${index}`}`;
  } else if (action.type === "groupButton") {
    const firstItemLabel = action.items[0]?.label || "";
    return `group-${firstItemLabel || `action-${index}`}`;
  } else if (action.type === "separator") {
    return `separator-${index}`;
  } else if (action.type === "heading") {
    return `heading-${action.label || `action-${index}`}`;
  } else if (action.type === "divider") {
    return `divider-${index}`;
  }
  return `action-${index}`;
};

/**
 * ButtonGroupのアイテムキーを生成するヘルパー関数
 *
 * @param item - グループ内のアイテム
 * @param parentIndex - 親グループのインデックス
 * @param itemIndex - アイテムのインデックス
 * @returns ユニークなキー文字列
 */
export const getGroupItemKey = (
  item: { label?: string },
  parentIndex: number,
  itemIndex: number,
): string => {
  return `group-${parentIndex}-item-${item.label || `item-${itemIndex}`}`;
};

/**
 * ドロップダウン内のアイテム用のより具体的なキーを生成するヘルパー関数
 *
 * @param item - ドロップダウン内のアイテム
 * @param prefix - キーのプレフィックス
 * @param parentIndex - 親要素のインデックス
 * @param itemIndex - アイテムのインデックス
 * @returns ユニークなキー文字列
 */
export const getDropdownItemKey = (
  item: { label?: string; icon?: React.ReactNode },
  prefix: string,
  parentIndex: number,
  itemIndex: number,
): string => {
  // ラベル、アイコン名（可能であれば）、またはインデックスの組み合わせでユニークなキーを生成
  let identifier = item.label;

  if (
    !identifier &&
    item.icon &&
    typeof item.icon === "object" &&
    item.icon !== null
  ) {
    // アイコンからpropsを取得してnameを抽出する試み
    const iconProps = (item.icon as any)?.props;
    if (iconProps?.name) {
      identifier = `icon-${iconProps.name}`;
    }
  }

  if (!identifier) {
    identifier = `item-${itemIndex}`;
  }

  return `${prefix}-${parentIndex}-${identifier}`;
};
