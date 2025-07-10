import React from "react";

/**
 * テーブルアクションボタン群の定義。enabledWhenとdisplayInで表示場所を制御：
 * - enabledWhen: "checked" + displayIn: "toolbar" → デスクトップ時は左側の直接ボタン、モバイル時は「n件を操作」ドロップダウン
 * - enabledWhen: "checked" + displayIn: "dropdown" → デスクトップ時は左側の3点リーダーボタン、モバイル時は「n件を操作」ドロップダウン
 * - enabledWhen: "unchecked" + displayIn: "toolbar" → デスクトップ時は右側の直接ボタン、モバイル時は右側の3点リーダーボタン
 * - enabledWhen: "unchecked" + displayIn: "dropdown" → デスクトップ・モバイル共に右側の3点リーダーボタン
 */
export type TableAction =
  | {
      type: "singleButton";
      label: string;
      icon?: React.ReactNode;
      onClick: (selectedRows: string[]) => void;
      color?:
        | "danger"
        | "primary"
        | "primaryPale"
        | "basicLight"
        | "basicDark"
        | "clear";
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
      disabled?: (checkedRows: string[]) => boolean;
      style?: React.CSSProperties; // テキスト色などのカスタムスタイル
      headingLabel?: string; // モバイル時のグループヘッダー（同じheadingLabelのアクションが自動グループ化される）
      dynamicIconColor?: {
        enabled: string; // 選択時（有効時）のアイコン色
        disabled?: string; // 非選択時（無効時）のアイコン色（省略時はcurrentColor）
      };
    }
  | {
      type: "groupButton";
      items: {
        label: string;
        icon?: React.ReactNode;
        onClick: (selectedRows: string[]) => void;
        color?:
          | "danger"
          | "primary"
          | "primaryPale"
          | "basicLight"
          | "basicDark"
          | "clear";
        enabledWhen?: "checked" | "unchecked" | "custom";
        disabled?: (checkedRows: string[]) => boolean;
        style?: React.CSSProperties;
        dynamicIconColor?: {
          enabled: string; // 選択時（有効時）のアイコン色
          disabled?: string; // 非選択時（無効時）のアイコン色（省略時はcurrentColor）
        };
      }[];
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
      headingLabel?: string; // モバイル時のグループヘッダー（同じheadingLabelのアクションが自動グループ化される）
    }
  | {
      type: "divider";
      displayIn?: "toolbar" | "dropdown";
    }
  | {
      type: "separator";
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
    }
  | {
      type: "heading";
      label: string;
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
    };
